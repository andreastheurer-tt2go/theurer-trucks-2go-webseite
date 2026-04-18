/**
 * TT2GO Google Ads — Wöchentlicher KI-Performance-Report
 *
 * Sammelt alle relevanten Performance-Daten und sendet sie als JSON
 * an einen n8n Webhook. n8n ruft die Claude API auf und postet
 * die KI-Analyse in Slack.
 *
 * Einrichtung: Google Ads → Tools → Scripts → Neues Script
 * Zeitplan: Wöchentlich, Sonntag, 09:00
 */

var CONFIG = {
  // n8n Webhook-URL (empfängt die Rohdaten, ruft Claude API auf, postet nach Slack)
  webhookUrl: 'https://n8n.srv1381541.hstgr.cloud/webhook/tt2go-ads-report',
  // Fallback: Direkter Slack-Webhook für Fehlermeldungen
  slackWebhookUrl: 'SLACK_WEBHOOK_URL_HIER_EINTRAGEN',
  // Nur Kampagnen mit diesem Präfix
  campaignPrefix: 'TT2GO',
  // Zeiträume
  daysThisWeek: 7,
  daysLastWeek: 14
};

function main() {
  try {
    var today = new Date();
    var thisWeekStart = formatDate(daysAgo(today, CONFIG.daysThisWeek));
    var thisWeekEnd = formatDate(daysAgo(today, 1));
    var lastWeekStart = formatDate(daysAgo(today, CONFIG.daysLastWeek));
    var lastWeekEnd = formatDate(daysAgo(today, CONFIG.daysThisWeek + 1));

    var data = {
      reportDate: today.toISOString(),
      periodThisWeek: { start: thisWeekStart, end: thisWeekEnd },
      periodLastWeek: { start: lastWeekStart, end: lastWeekEnd },

      // 1. Kampagnen-Performance
      campaignsThisWeek: getCampaignData(thisWeekStart, thisWeekEnd),
      campaignsLastWeek: getCampaignData(lastWeekStart, lastWeekEnd),

      // 2. Anzeigengruppen-Performance
      adGroupsThisWeek: getAdGroupData(thisWeekStart, thisWeekEnd),

      // 3. Keyword-Performance + Qualitätsfaktor
      keywords: getKeywordData(thisWeekStart, thisWeekEnd),

      // 4. Suchbegriffe (Top 30 nach Klicks + alle mit Conversions)
      searchTermsTop: getTopSearchTerms(thisWeekStart, thisWeekEnd, 30),
      searchTermsConverting: getConvertingSearchTerms(thisWeekStart, thisWeekEnd),
      searchTermsWasteful: getWastefulSearchTerms(thisWeekStart, thisWeekEnd),

      // 5. Geräte-Aufschlüsselung
      devicePerformance: getDeviceData(thisWeekStart, thisWeekEnd),

      // 6. Wochentag-Performance
      dayOfWeekPerformance: getDayOfWeekData(thisWeekStart, thisWeekEnd),

      // 7. Uhrzeitverteilung
      hourlyPerformance: getHourlyData(thisWeekStart, thisWeekEnd),

      // 8. Impression Share + Verlustgründe
      impressionShare: getImpressionShareData(thisWeekStart, thisWeekEnd),

      // 9. Geografie-Performance
      geoPerformance: getGeoData(thisWeekStart, thisWeekEnd),

      // 10. Anzeigen-Performance
      adPerformance: getAdData(thisWeekStart, thisWeekEnd)
    };

    // An n8n Webhook senden
    sendToWebhook(data);
    Logger.log('Daten erfolgreich an n8n gesendet.');

  } catch (e) {
    Logger.log('Fehler: ' + e.message);
    // Fehlermeldung an Slack senden
    sendErrorToSlack('Google Ads Script Fehler: ' + e.message);
  }
}


// ═══════════════════════════════════════════════════════════════
//  1. KAMPAGNEN-PERFORMANCE
// ═══════════════════════════════════════════════════════════════

function getCampaignData(startDate, endDate) {
  var campaigns = [];
  var report = AdsApp.report(
    'SELECT CampaignName, Cost, Clicks, Impressions, Conversions, ' +
    'CostPerConversion, Ctr, AverageCpc, ConversionRate ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND CampaignStatus = ENABLED ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    campaigns.push({
      name: row['CampaignName'],
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions']),
      costPerConversion: parseNum(row['CostPerConversion']),
      ctr: row['Ctr'],
      averageCpc: parseNum(row['AverageCpc']),
      conversionRate: row['ConversionRate']
    });
  }
  return campaigns;
}


// ═══════════════════════════════════════════════════════════════
//  2. ANZEIGENGRUPPEN-PERFORMANCE
// ═══════════════════════════════════════════════════════════════

function getAdGroupData(startDate, endDate) {
  var adGroups = [];
  var report = AdsApp.report(
    'SELECT CampaignName, AdGroupName, Cost, Clicks, Impressions, ' +
    'Conversions, CostPerConversion, Ctr, AverageCpc, ConversionRate ' +
    'FROM ADGROUP_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND AdGroupStatus = ENABLED ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    adGroups.push({
      campaign: row['CampaignName'],
      adGroup: row['AdGroupName'],
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions']),
      costPerConversion: parseNum(row['CostPerConversion']),
      ctr: row['Ctr'],
      averageCpc: parseNum(row['AverageCpc']),
      conversionRate: row['ConversionRate']
    });
  }
  return adGroups;
}


// ═══════════════════════════════════════════════════════════════
//  3. KEYWORD-PERFORMANCE + QUALITÄTSFAKTOR
// ═══════════════════════════════════════════════════════════════

function getKeywordData(startDate, endDate) {
  var keywords = [];
  var report = AdsApp.report(
    'SELECT CampaignName, AdGroupName, Criteria, KeywordMatchType, ' +
    'Cost, Clicks, Impressions, Conversions, CostPerConversion, ' +
    'Ctr, AverageCpc, QualityScore, CreativeQualityScore, ' +
    'PostClickQualityScore, SearchPredictedCtr, Status ' +
    'FROM KEYWORDS_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND Status = ENABLED ' +
    'AND Impressions > 0 ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    keywords.push({
      campaign: row['CampaignName'],
      adGroup: row['AdGroupName'],
      keyword: row['Criteria'],
      matchType: row['KeywordMatchType'],
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions']),
      costPerConversion: parseNum(row['CostPerConversion']),
      ctr: row['Ctr'],
      averageCpc: parseNum(row['AverageCpc']),
      qualityScore: row['QualityScore'],
      adRelevance: row['CreativeQualityScore'],
      landingPageExperience: row['PostClickQualityScore'],
      expectedCtr: row['SearchPredictedCtr']
    });
  }

  // Nach Klicks sortieren
  keywords.sort(function(a, b) { return b.clicks - a.clicks; });
  return keywords;
}


// ═══════════════════════════════════════════════════════════════
//  4. SUCHBEGRIFFE
// ═══════════════════════════════════════════════════════════════

function getTopSearchTerms(startDate, endDate, limit) {
  var terms = [];
  var report = AdsApp.report(
    'SELECT Query, KeywordTextMatchingQuery, Clicks, Impressions, ' +
    'Cost, Conversions, CostPerConversion, Ctr ' +
    'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    terms.push({
      query: row['Query'],
      matchedKeyword: row['KeywordTextMatchingQuery'],
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      cost: parseNum(row['Cost']),
      conversions: parseNum(row['Conversions']),
      ctr: row['Ctr']
    });
  }

  terms.sort(function(a, b) { return b.clicks - a.clicks; });
  return terms.slice(0, limit);
}

function getConvertingSearchTerms(startDate, endDate) {
  var terms = [];
  var report = AdsApp.report(
    'SELECT Query, KeywordTextMatchingQuery, Clicks, Cost, Conversions, CostPerConversion ' +
    'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND Conversions > 0 ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    terms.push({
      query: row['Query'],
      matchedKeyword: row['KeywordTextMatchingQuery'],
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      cost: parseNum(row['Cost']),
      conversions: parseNum(row['Conversions']),
      costPerConversion: parseNum(row['CostPerConversion'])
    });
  }

  terms.sort(function(a, b) { return b.conversions - a.conversions; });
  return terms;
}

function getWastefulSearchTerms(startDate, endDate) {
  var terms = [];
  var report = AdsApp.report(
    'SELECT Query, Clicks, Cost, Conversions ' +
    'FROM SEARCH_QUERY_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND Conversions = 0 ' +
    'AND Cost > 3.0 ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    terms.push({
      query: row['Query'],
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      cost: parseNum(row['Cost'])
    });
  }

  terms.sort(function(a, b) { return b.cost - a.cost; });
  return terms.slice(0, 10);
}


// ═══════════════════════════════════════════════════════════════
//  5. GERÄTE-AUFSCHLÜSSELUNG
// ═══════════════════════════════════════════════════════════════

function getDeviceData(startDate, endDate) {
  var devices = [];
  var report = AdsApp.report(
    'SELECT Device, CampaignName, Cost, Clicks, Impressions, ' +
    'Conversions, Ctr, AverageCpc, ConversionRate ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND CampaignStatus = ENABLED ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    devices.push({
      device: row['Device'],
      campaign: row['CampaignName'],
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions']),
      ctr: row['Ctr'],
      averageCpc: parseNum(row['AverageCpc']),
      conversionRate: row['ConversionRate']
    });
  }
  return devices;
}


// ═══════════════════════════════════════════════════════════════
//  6. WOCHENTAG-PERFORMANCE
// ═══════════════════════════════════════════════════════════════

function getDayOfWeekData(startDate, endDate) {
  var days = [];
  var report = AdsApp.report(
    'SELECT DayOfWeek, Cost, Clicks, Impressions, Conversions, ' +
    'Ctr, AverageCpc ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND CampaignStatus = ENABLED ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    days.push({
      dayOfWeek: row['DayOfWeek'],
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions']),
      ctr: row['Ctr'],
      averageCpc: parseNum(row['AverageCpc'])
    });
  }
  return days;
}


// ═══════════════════════════════════════════════════════════════
//  7. UHRZEITVERTEILUNG
// ═══════════════════════════════════════════════════════════════

function getHourlyData(startDate, endDate) {
  var hours = [];
  var report = AdsApp.report(
    'SELECT HourOfDay, Cost, Clicks, Impressions, Conversions ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND CampaignStatus = ENABLED ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    hours.push({
      hour: parseInt(row['HourOfDay'], 10),
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions'])
    });
  }

  // Nach Stunde sortieren
  hours.sort(function(a, b) { return a.hour - b.hour; });
  return hours;
}


// ═══════════════════════════════════════════════════════════════
//  8. IMPRESSION SHARE + VERLUSTGRÜNDE
// ═══════════════════════════════════════════════════════════════

function getImpressionShareData(startDate, endDate) {
  var shareData = [];
  var report = AdsApp.report(
    'SELECT CampaignName, SearchImpressionShare, SearchExactMatchImpressionShare, ' +
    'SearchRankLostImpressionShare, SearchBudgetLostImpressionShare, ' +
    'SearchTopImpressionShare, SearchAbsoluteTopImpressionShare ' +
    'FROM CAMPAIGN_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND CampaignStatus = ENABLED ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    shareData.push({
      campaign: row['CampaignName'],
      impressionShare: row['SearchImpressionShare'],
      exactMatchShare: row['SearchExactMatchImpressionShare'],
      lostToRank: row['SearchRankLostImpressionShare'],
      lostToBudget: row['SearchBudgetLostImpressionShare'],
      topImpressionShare: row['SearchTopImpressionShare'],
      absoluteTopShare: row['SearchAbsoluteTopImpressionShare']
    });
  }
  return shareData;
}


// ═══════════════════════════════════════════════════════════════
//  9. GEOGRAFIE-PERFORMANCE
// ═══════════════════════════════════════════════════════════════

function getGeoData(startDate, endDate) {
  var geo = [];
  var report = AdsApp.report(
    'SELECT CountryCriteriaId, RegionCriteriaId, CityCriteriaId, ' +
    'CampaignName, Cost, Clicks, Impressions, Conversions ' +
    'FROM GEO_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND Clicks > 0 ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    geo.push({
      campaign: row['CampaignName'],
      country: row['CountryCriteriaId'],
      region: row['RegionCriteriaId'],
      city: row['CityCriteriaId'],
      cost: parseNum(row['Cost']),
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      conversions: parseNum(row['Conversions'])
    });
  }

  geo.sort(function(a, b) { return b.clicks - a.clicks; });
  return geo.slice(0, 30);
}


// ═══════════════════════════════════════════════════════════════
//  10. ANZEIGEN-PERFORMANCE
// ═══════════════════════════════════════════════════════════════

function getAdData(startDate, endDate) {
  var ads = [];
  var report = AdsApp.report(
    'SELECT CampaignName, AdGroupName, HeadlinePart1, HeadlinePart2, ' +
    'Description, Clicks, Impressions, Cost, Conversions, Ctr, AverageCpc ' +
    'FROM AD_PERFORMANCE_REPORT ' +
    'WHERE CampaignName CONTAINS_IGNORE_CASE "' + CONFIG.campaignPrefix + '" ' +
    'AND Impressions > 0 ' +
    'DURING ' + startDate + ',' + endDate
  );

  var rows = report.rows();
  while (rows.hasNext()) {
    var row = rows.next();
    ads.push({
      campaign: row['CampaignName'],
      adGroup: row['AdGroupName'],
      headline1: row['HeadlinePart1'],
      headline2: row['HeadlinePart2'],
      description: row['Description'],
      clicks: parseInt(row['Clicks'].replace(/,/g, ''), 10),
      impressions: parseInt(row['Impressions'].replace(/,/g, ''), 10),
      cost: parseNum(row['Cost']),
      conversions: parseNum(row['Conversions']),
      ctr: row['Ctr'],
      averageCpc: parseNum(row['AverageCpc'])
    });
  }
  return ads;
}


// ═══════════════════════════════════════════════════════════════
//  WEBHOOK + SLACK SENDEN
// ═══════════════════════════════════════════════════════════════

function sendToWebhook(data) {
  var payload = JSON.stringify(data);

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(CONFIG.webhookUrl, options);

  if (response.getResponseCode() !== 200) {
    Logger.log('Webhook-Fehler: ' + response.getResponseCode() + ' ' + response.getContentText());
    sendErrorToSlack('n8n Webhook Fehler: HTTP ' + response.getResponseCode());
  }
}

function sendErrorToSlack(errorMessage) {
  var payload = JSON.stringify({
    text: ':rotating_light: *TT2GO Google Ads Script — Fehler*\n' + errorMessage +
          '\nBitte Script in Google Ads prüfen.'
  });

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true
  };

  UrlFetchApp.fetch(CONFIG.slackWebhookUrl, options);
}


// ═══════════════════════════════════════════════════════════════
//  HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════

function parseNum(str) {
  if (!str || str === '--' || str === ' --') return 0;
  return parseFloat(str.replace(/,/g, '').replace(/%/g, ''));
}

function daysAgo(date, days) {
  var d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
}

function formatDate(date) {
  var yyyy = date.getFullYear();
  var mm = ('0' + (date.getMonth() + 1)).slice(-2);
  var dd = ('0' + date.getDate()).slice(-2);
  return yyyy + mm + dd;
}
