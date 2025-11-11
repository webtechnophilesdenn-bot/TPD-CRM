<?php
return [
  'useCache' => true,
  'jobMaxPortion' => 15,
  'jobRunInParallel' => false,
  'jobPoolConcurrencyNumber' => 8,
  'daemonMaxProcessNumber' => 5,
  'daemonInterval' => 10,
  'daemonProcessTimeout' => 36000,
  'jobForceUtc' => false,
  'recordsPerPage' => 20,
  'recordsPerPageSmall' => 5,
  'recordsPerPageSelect' => 10,
  'recordsPerPageKanban' => 5,
  'applicationName' => 'TPD CRM',
  'timeZone' => 'Asia/Kolkata',
  'dateFormat' => 'DD.MM.YYYY',
  'timeFormat' => 'HH:mm',
  'weekStart' => 0,
  'thousandSeparator' => ',',
  'decimalMark' => '.',
  'exportDelimiter' => ',',
  'currencyList' => [
    0 => 'INR'
  ],
  'defaultCurrency' => 'INR',
  'baseCurrency' => 'INR',
  'currencyRates' => [],
  'currencyNoJoinMode' => false,
  'outboundEmailIsShared' => false,
  'outboundEmailFromName' => 'TPD CRM',
  'outboundEmailFromAddress' => NULL,
  'smtpServer' => NULL,
  'smtpPort' => 587,
  'smtpAuth' => true,
  'smtpSecurity' => 'TLS',
  'smtpUsername' => NULL,
  'language' => 'en_US',
  'authenticationMethod' => 'Espo',
  'tabQuickSearch' => true,
  'globalSearchEntityList' => [
    0 => 'Account',
    1 => 'Contact',
    2 => 'Lead',
    3 => 'Opportunity'
  ],
  'tabList' => [
    0 => (object) [
      'type' => 'divider',
      'id' => '342567',
      'text' => '$CRM'
    ],
    1 => 'Account',
    2 => 'Lead',
    3 => 'Contact',
    4 => 'Opportunity',
    5 => 'Ticket',
    6 => (object) [
      'type' => 'divider',
      'text' => '$Finance',
      'id' => '789456'
    ],
    7 => 'Invoice',
    8 => 'Quote',
    9 => 'Payment',
    10 => 'Expense',
    11 => (object) [
      'type' => 'divider',
      'text' => '$Activities',
      'id' => '219419'
    ],
    12 => 'Email',
    13 => 'Meeting',
    14 => 'Call',
    15 => 'Task',
    16 => 'Calendar',
    17 => (object) [
      'type' => 'divider',
      'id' => '655187',
      'text' => '$Support'
    ],
    18 => 'Case',
    19 => 'KnowledgeBaseArticle',
    20 => (object) [
      'type' => 'divider',
      'text' => NULL,
      'id' => '137994'
    ],
    21 => '_delimiter_',
    22 => (object) [
      'type' => 'divider',
      'text' => '$Marketing',
      'id' => '463280'
    ],
    23 => 'Campaign',
    24 => 'TargetList',
    25 => (object) [
      'type' => 'divider',
      'text' => '$Business',
      'id' => '518202'
    ],
    26 => 'Document',
    27 => (object) [
      'type' => 'divider',
      'text' => '$Organization',
      'id' => '566592'
    ],
    28 => 'User',
    29 => 'Team',
    30 => 'WorkingTimeCalendar',
    31 => (object) [
      'type' => 'divider',
      'text' => NULL,
      'id' => '898671'
    ],
    32 => 'EmailTemplate',
    33 => 'Template',
    34 => 'Import'
  ],
  'quickCreateList' => [
    0 => 'Account',
    1 => 'Contact',
    2 => 'Lead',
    3 => 'Opportunity',
    4 => 'Ticket',
    5 => 'Invoice',
    6 => 'Quote',
    7 => 'Payment',
    8 => 'Meeting',
    9 => 'Call',
    10 => 'Task',
    11 => 'Case',
    12 => 'Email',
    13 => 'Expense',
    14 => 'User',
    15 => 'Campaign',
    16 => 'KnowledgeBaseArticle',
    17 => 'TargetList',
    18 => 'Cemin',
    19 => 'Document'
  ],
  'exportDisabled' => false,
  'adminNotifications' => true,
  'adminNotificationsNewVersion' => true,
  'adminNotificationsCronIsNotConfigured' => true,
  'adminNotificationsNewExtensionVersion' => true,
  'assignmentEmailNotifications' => false,
  'assignmentEmailNotificationsEntityList' => [
    0 => 'Lead',
    1 => 'Opportunity',
    2 => 'Task',
    3 => 'Case'
  ],
  'assignmentNotificationsEntityList' => [
    0 => 'Meeting',
    1 => 'Call',
    2 => 'Email'
  ],
  'portalStreamEmailNotifications' => true,
  'streamEmailNotificationsEntityList' => [
    0 => 'Case'
  ],
  'streamEmailNotificationsTypeList' => [
    0 => 'Post',
    1 => 'Status',
    2 => 'EmailReceived'
  ],
  'emailNotificationsDelay' => 30,
  'emailMessageMaxSize' => 10,
  'emailRecipientAddressMaxCount' => 100,
  'notificationsCheckInterval' => 10,
  'notificationGrouping' => true,
  'popupNotificationsCheckInterval' => 15,
  'maxEmailAccountCount' => 2,
  'followCreatedEntities' => false,
  'b2cMode' => false,
  'theme' => 'Hazyblue',
  'themeParams' => (object) [
    'navbar' => 'side'
  ],
  'massEmailMaxPerHourCount' => 100,
  'massEmailMaxPerBatchCount' => NULL,
  'massEmailVerp' => false,
  'personalEmailMaxPortionSize' => 50,
  'inboundEmailMaxPortionSize' => 50,
  'emailAddressLookupEntityTypeList' => [
    0 => 'User'
  ],
  'emailAddressSelectEntityTypeList' => [
    0 => 'User',
    1 => 'Contact',
    2 => 'Lead',
    3 => 'Account'
  ],
  'emailAddressEntityLookupDefaultOrder' => [
    0 => 'User',
    1 => 'Contact',
    2 => 'Lead',
    3 => 'Account'
  ],
  'phoneNumberEntityLookupDefaultOrder' => [
    0 => 'User',
    1 => 'Contact',
    2 => 'Lead',
    3 => 'Account'
  ],
  'authTokenLifetime' => 0,
  'authTokenMaxIdleTime' => 48,
  'userNameRegularExpression' => '[^a-z0-9\\-@_\\.\\s]',
  'addressFormat' => 1,
  'displayListViewRecordCount' => true,
  'dashboardLayout' => [
    0 => (object) [
      'name' => 'My Dashboard',
      'layout' => [
        0 => (object) [
          'id' => 'd124488',
          'name' => 'QuoteChart',
          'x' => 0,
          'y' => 0,
          'width' => 2,
          'height' => 2
        ],
        1 => (object) [
          'id' => 'd854270',
          'name' => 'InvoiceChart',
          'x' => 2,
          'y' => 0,
          'width' => 2,
          'height' => 2
        ],
        2 => (object) [
          'id' => 'd593253',
          'name' => 'ExpenseChart',
          'x' => 0,
          'y' => 2,
          'width' => 2,
          'height' => 2
        ],
        3 => (object) [
          'id' => 'd807577',
          'name' => 'PaymentChart',
          'x' => 2,
          'y' => 2,
          'width' => 2,
          'height' => 2
        ]
      ]
    ]
  ],
  'calendarEntityList' => [
    0 => 'Meeting',
    1 => 'Call',
    2 => 'Task'
  ],
  'activitiesEntityList' => [
    0 => 'Meeting',
    1 => 'Call'
  ],
  'historyEntityList' => [
    0 => 'Meeting',
    1 => 'Call',
    2 => 'Email'
  ],
  'busyRangesEntityList' => [
    0 => 'Meeting',
    1 => 'Call'
  ],
  'emailAutoReplySuppressPeriod' => '2 hours',
  'emailAutoReplyLimit' => 5,
  'cleanupJobPeriod' => '1 month',
  'cleanupActionHistoryPeriod' => '15 days',
  'cleanupAuthTokenPeriod' => '1 month',
  'cleanupSubscribers' => true,
  'cleanupAudit' => true,
  'cleanupAuditPeriod' => '3 months',
  'appLogAdminAllowed' => false,
  'currencyFormat' => 2,
  'currencyDecimalPlaces' => 2,
  'aclAllowDeleteCreated' => false,
  'aclAllowDeleteCreatedThresholdPeriod' => '24 hours',
  'attachmentAvailableStorageList' => NULL,
  'attachmentUploadMaxSize' => 256,
  'attachmentUploadChunkSize' => 4,
  'inlineAttachmentUploadMaxSize' => 20,
  'textFilterUseContainsForVarchar' => false,
  'tabColorsDisabled' => false,
  'massPrintPdfMaxCount' => 50,
  'emailKeepParentTeamsEntityList' => [
    0 => 'Case'
  ],
  'streamEmailWithContentEntityTypeList' => [
    0 => 'Case'
  ],
  'recordListMaxSizeLimit' => 200,
  'noteDeleteThresholdPeriod' => '1 month',
  'noteEditThresholdPeriod' => '7 days',
  'notePinnedMaxCount' => 5,
  'emailForceUseExternalClient' => false,
  'useWebSocket' => false,
  'auth2FAMethodList' => [
    0 => 'Totp'
  ],
  'auth2FAInPortal' => false,
  'personNameFormat' => 'firstLast',
  'newNotificationCountInTitle' => false,
  'pdfEngine' => 'Dompdf',
  'smsProvider' => NULL,
  'mapProvider' => 'Google',
  'defaultFileStorage' => 'EspoUploadDir',
  'ldapUserNameAttribute' => 'sAMAccountName',
  'ldapUserFirstNameAttribute' => 'givenName',
  'ldapUserLastNameAttribute' => 'sn',
  'ldapUserTitleAttribute' => 'title',
  'ldapUserEmailAddressAttribute' => 'mail',
  'ldapUserPhoneNumberAttribute' => 'telephoneNumber',
  'ldapUserObjectClass' => 'person',
  'ldapPortalUserLdapAuth' => false,
  'passwordGenerateLength' => 10,
  'passwordStrengthLength' => NULL,
  'passwordStrengthLetterCount' => NULL,
  'passwordStrengthNumberCount' => NULL,
  'passwordStrengthBothCases' => false,
  'passwordStrengthSpecialCharacterCount' => NULL,
  'massActionIdleCountThreshold' => 100,
  'exportIdleCountThreshold' => 1000,
  'oidcJwtSignatureAlgorithmList' => [
    0 => 'RS256'
  ],
  'oidcUsernameClaim' => 'sub',
  'oidcFallback' => true,
  'oidcScopes' => [
    0 => 'profile',
    1 => 'email',
    2 => 'phone'
  ],
  'oidcAuthorizationPrompt' => 'consent',
  'listViewSettingsDisabled' => false,
  'cleanupDeletedRecords' => true,
  'phoneNumberNumericSearch' => true,
  'phoneNumberInternational' => true,
  'phoneNumberExtensions' => false,
  'phoneNumberPreferredCountryList' => [
    0 => 'us',
    1 => 'de'
  ],
  'wysiwygCodeEditorDisabled' => false,
  'customPrefixDisabled' => false,
  'listPagination' => true,
  'starsLimit' => 500,
  'quickSearchFullTextAppendWildcard' => false,
  'authIpAddressCheck' => false,
  'authIpAddressWhitelist' => [],
  'authIpAddressCheckExcludedUsersIds' => [],
  'authIpAddressCheckExcludedUsersNames' => (object) [],
  'availableReactions' => [
    0 => 'Like'
  ],
  'streamReactionsCheckMaxSize' => 50,
  'emailScheduledBatchCount' => 50,
  'emailAddressMaxCount' => 10,
  'phoneNumberMaxCount' => 10,
  'iframeSandboxExcludeDomainList' => [
    0 => 'youtube.com',
    1 => 'google.com'
  ],
  'clientCspScriptSourceList' => [
    0 => 'https://maps.googleapis.com',
    1 => 'https://cdn.jsdelivr.net'
  ],
  'microtime' => 1762897862.08204,
  'siteUrl' => 'http://localhost/tpdcrm',
  'fullTextSearchMinLength' => 4,
  'userThemesDisabled' => false,
  'avatarsDisabled' => false,
  'scopeColorsDisabled' => false,
  'tabIconsDisabled' => false,
  'dashletsOptions' => (object) []
];
