# Коннектора для Сервера ККМ (TS)

Библиотека `skkmconnectorts` — программная обёртка над REST API **Сервера ККМ** для приложений на TypeScript/JavaScript (Node.js и браузер).

Позволяет добавить печать чеков и управление ККТ в любое TS/JS-приложение без ручной сборки HTTP-запросов и JSON. Работа строится вокруг одного класса `ServerKkm`: заполняете свойства, вызываете метод, читаете результат из свойств .

## Содержание

- [Возможности](#1-возможности)
- [Требования](#2-требования)
- [Структура библиотеки](#3-структура-библиотеки)
- [Варианты интеграции](#4-варианты-интеграции)
- [Пример работы с ККТ](#5-пример-работы-с-ккт)
- [Полный API](#полный-api) 

# 1. Возможности

- **Полное покрытие REST API Сервера ККМ 4.0** — печать чеков, возвраты и коррекции, открытие и закрытие смены, X/Z-отчёты и отчёт о расчётах, внесение и выемка наличных, слипы, картинки, маркировка, фискализация, очередь печати, шаблоны, операции, а также администрирование (пользователи, настройки службы, пулы, добавление и изменение ККТ).
- **Простой доступ** — один объект `ServerKkm`: заполняете свойства, вызываете метод, читаете результат из свойств — без ручной сборки HTTP-запросов.
- **Синхронный и асинхронный режим** — ждать ответ на кассе или поставить задание в очередь и опросить статус позже.
- **Состояние касс** — список устройств с сервера, сведения о ККТ, статус смены, счётчики, остаток наличных.


# 2. Требования

- **Платформа:** Node.js 18+ либо современный браузер;
- **Доступный Сервер ККМ 4.0** — доступная служба печати (по умолчанию TCP-порт `4398`); если на сервере выключен анонимный доступ — токен авторизации пользователя.


# 3. Структура библиотеки

```
src/
├── core/   — класс ServerKkm: подключение, методы API, состояние, разбор ответов
├── dto/    — публичные типы: позиции чека, оплаты, покупатель, перечисления, результаты
└── data/   — внутренний HTTP-транспорт и контракты обмена с сервером
```

## 3.1 Свойства `ServerKkm`

### 3.1.1 Подключение

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Host` | `string` | Хост сервера ККМ (IP или DNS). По умолчанию `localhost`. |
| `Port` | `number` | Порт службы печати. По умолчанию `4398`. |
| `UseHttps` | `boolean` | Обращаться по HTTPS вместо HTTP. |
| `TimeoutMs` | `number` | Таймаут запроса, мс. По умолчанию `60000`. |
| `Token` | `string` | Токен авторизации (заголовок `api_key`). Нужен, если анонимный доступ выключен. |
| `AuthUserName` | `string` | Логин для `GetUserToken()` (Basic Auth). По умолчанию `Admin`. |
| `AuthPassword` | `string` | Пароль для `GetUserToken()`. По умолчанию `Admin`. |
| `TerminalId` | `string` | Идентификатор рабочего места (заголовок `TerminalId`). |
| `DeviceName` | `string` | Имя кассы на сервере ККМ. |
| `Cashier` | `Cashier` | Кассир для документов. |
| `PoolName` | `string` | Имя пула устройств. |
| `QueueTaskId` | `string` | Id задания в очереди печати. |
| `PictureId` | `string` | Имя картинки / шаблона. |
| `TemplateName` | `string` | Имя шаблона печати или чека. |
| `UserId` | `string` | Идентификатор пользователя сервера ККМ. |
| `FnNumber` | `string` | Номер ФН (копия чека по данным ФН). |
| `ReportType` | `number` | Тип отчёта для списка Z-отчётов. |
| `MarkingCodes` | `string[]` | Коды маркировки для проверки (`VerifyMarking` и аналоги). |
| `DeviceSettings` | `DeviceSettings` | Настройки кассы для добавления / изменения. |
| `ServiceSettings` | `ServiceSettings` | Настройки службы печати. |
| `ServiceUser` | `ServiceUser` | Пользователь сервера ККМ. |
| `TemplateParameters` | `TemplateParameters` | Параметры шаблона печати. |
| `CheckTemplateParameters` | `CheckTemplateParameters` | Параметры шаблона чека. |
| `FiscalizationParameters` | `FiscalizationParameters` | Параметры фискализации / перерегистрации. |
| `ShiftsFrom` / `ShiftsTo` | `string` | Период для списков отчётов, чеков и операций (`yyyy-MM-dd`, по умолчанию последние 7 дней). |

Хост, порт, токен и имя кассы можно менять между вызовами — один экземпляр по очереди работает с разными ККТ.
Прервать текущий запрос: `kkm.cancel()`.

### 3.1.2 Входные свойства операций

Перед новым чеком вызывайте `NewRequest()` — очистятся позиции, оплаты, покупатель, коррекция и результаты прошлого вызова. Подключение и кассир останутся.

| Свойство | Тип | Описание |
| --- | --- | --- |
| `PaymentType` | `CheckType` | Тип чека / задания:<br>Text - Текст<br>Sale - Продажа (приход)<br>SaleReturn - Возврат (возврат прихода)<br>Purchase - Покупка (расход)<br>PurchaseReturn - Возврат покупки (возврат расхода)<br>CorrectionSale - Чек коррекции прихода<br>CorrectionSaleReturn - Чек коррекции возврата прихода<br>CorrectionPurchase - Чек коррекции расхода<br>CorrectionPurchaseReturn - Чек коррекции возврата расхода<br>Slip - Слип<br>Fiscalization - Фискализация<br>OpenShift - Открытие смены<br>CloseShift - Z-отчёт<br>ReportX - X-отчёт<br>ReportSettlement - Отчёт о состоянии расчётов<br>CashOut - Выемка<br>CashIn - Внесение<br>OpenCashDrawer - Открытие денежного ящика<br>CopyFromFn - Копия из ФН<br>DocumentCopy - Дубликат документа |
| `TaxVariant` | `TaxSystem` | Система налогообложения (СНО):<br>ОСН - Общий<br>УСН - Упрощенная Доход<br>УСНД_Р - Упрощенная Доход минус Расход<br>ЕНВД - Единый налог на вмененный доход<br>ЕСН - Единый сельскохозяйственный налог<br>ПСН - Патентная система налогообложения |
| `Electronically` | `boolean` | Электронный чек (без печати на бумаге). |
| `TextBefore` | `string` | Текст в шапке (до товарной части). |
| `TextAfter` | `string` | Текст в подвале (после товарной части). |
| `SaleLocation` | `string` | Место расчётов. |
| `SaleAddress` | `string` | Адрес расчётов. |
| `SenderEmail` | `string` | Email отправителя чека. |
| `OperationOnline` | `boolean` | Расчёт в безналичном порядке в сети «Интернет». |
| `AdditionalAttribute` | `string` | Дополнительный реквизит чека (тег 1192). Рекомендуется указывать ФП корректируемого чека при возврате/коррекции. |
| `TimeZone` | `CheckTimeZone` | Часовая зона:<br>Auto - Авто (из настроек ККТ)<br>MskMinus1 - 1-я часовая зона (МСК−1, UTC+2)<br>Msk - 2-я часовая зона (МСК, UTC+3)<br>MskPlus1 - 3-я часовая зона (МСК+1, UTC+4)<br>MskPlus2 - 4-я часовая зона (МСК+2, UTC+5)<br>MskPlus3 - 5-я часовая зона (МСК+3, UTC+6)<br>MskPlus4 - 6-я часовая зона (МСК+4, UTC+7)<br>MskPlus5 - 7-я часовая зона (МСК+5, UTC+8)<br>MskPlus6 - 8-я часовая зона (МСК+6, UTC+9)<br>MskPlus7 - 9-я часовая зона (МСК+7, UTC+10)<br>MskPlus8 - 10-я часовая зона (МСК+8, UTC+11)<br>MskPlus9 - 11-я часовая зона (МСК+9, UTC+12) |
| `IndustryAttribute` | `Industry` | Отраслевой реквизит чека. Поля: `IdentifierFoiv`, `DocumentDate`, `DocumentNumber`, `AttributeValue`. |
| `UserAttribute` | `UserAttribute` | Дополнительный реквизит пользователя. Поля: `Name`, `Value`. |
| `OperationalAttribute` | `OperationalAttribute` | Операционный реквизит чека. Поля: `DateTime` (формат `"ЧЧ:ММ:СС ДД.ММ.ГГГГ"`, тег 1273 ФФД), `OperationId`, `OperationData`. |
| `AgentSign` | `AgentType` | Признак агента:<br>BankPaymentAgent - Банковский платежный агент<br>BankPaymentSubagent - Банковский платежный субагент<br>PaymentAgent - Платежный агент<br>PaymentSubagent - Платёжный субагент<br>Attorney - Поверенный<br>Commissioner - Комиссионер<br>Agent - Агент (иной тип) |
| `Agent` | `Agent` | Данные агента. |
| `Vendor` | `Vendor` | Данные поставщика. |
| `Customer` | `Customer` | Сведения о покупателе. |
| `Payments` | `Payments` | Оплаты. |
| `Positions` | `Position[]` | Позиции чека (`FiscalLine`, `TextLine`, `BarcodeLine`, `PictureLine`, `SeparatorLine`). |
| `ElectronicPayments` | `ElectronicPayment[]` | Детализация безналичных оплат. |
| `CorrectionData` | `CorrectionData` | Данные коррекции. |
| `Correction105Taxes` | `Correction105Taxes` | Суммы НДС по ставкам для коррекции ФФД 1.0.5. |
| `CashAmount` | `number` | Сумма внесения / выемки. |
| `TextForPrint` | `string` | Текст нефискального документа (слип). |
| `PictureName` | `string` | Имя картинки на сервере. |
| `PictureBase64` | `string` | Картинка в Base64. |
| `PictureAlignment` | `PictureAlignment` | Выравнивание: Left - слева; Center - по центру; Right - справа. |
| `DocumentId` | `string` | Идентификатор документа (`docId`). |
| `FiscalSign` | `string` | Фискальный признак документа. |
| `ShiftNumber` | `number` | Номер смены (вход/выход в зависимости от метода). |
| `CheckNumber` | `number` | Номер фискального документа. |
| `MarkingCode` | `string` | Код маркировки в Base64. |
| `PlannedStatus` | `MarkingPlannedStatus` | Планируемый статус (таблица 105 ФФД): NotSpecified - Не задан<br>Sold - Реализован<br>InSale - Мерный товар в стадии реализации<br>Returned - Возвращён<br>PartiallyReturned - Часть товара возвращена<br>Unchanged - Статус не изменился |
| `MarkingQuantity` | `number` | Количество для проверки КМ. |
| `MeasureOfQuantity` | `MeasureOfQuantity` | Мера количества предмета расчёта (см. п. 3.2.1, `FiscalLine.MeasureOfQuantity`). |
| `FractionalQuantityNumerator` | `number` | Числитель дробного количества. |
| `FractionalQuantityDenominator` | `number` | Знаменатель дробного количества (не должен быть 0, если дробь применяется). |
| `NotSendToServer` | `boolean` | Не отправлять результат проверки на сервер ОИСМ. |
| `WaitForResult` | `boolean` | Ждать ответ ОИСМ. |
| `RequestKmGuid` | `string` | Уникальный код запроса КМ. |
| `ConfirmationType` | `KmConfirmationType` | Признак подтверждения кода маркировки: Included - Код маркировки включён в документ реализации; NotIncluded - Код маркировки не включён в документ реализации |
| `IsProcessed` | `boolean` | Только обработанные операции (параметр `isProcessed` в `GetOperationLast`). |

### 3.1.3 Свойства-результаты

После каждого вызова коннектор сам разбирает ответ сервера: в `Ok` / `ErrorCode` / `ErrorDescription` попадает статус, а содержимое `Result` — в свойства объекта (в том числе плоские поля ниже после фискальных операций).

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Ok` | `boolean` | Успех последнего вызова. |
| `ErrorCode` | `number` | Код ошибки сервера. `0` — нет ошибки. |
| `ErrorDescription` | `string` | Текст ошибки. |
| `LastResult` | `unknown` | Поле `Result` последнего ответа. |
| `FiscalResult` | `FiscalResult` | Фискальный блок ответа (ФП, номер смены/документа и т.д.). |
| `DocumentId` | `string` | Идентификатор документа (`docId`) из ответа. |
| `FiscalSign` | `string` | Фискальный признак документа. |
| `ShiftNumber` | `number` | Номер смены. |
| `CheckNumber` | `number` | Номер фискального документа (ФД). |
| `CheckNumberInShift` | `number` | Номер чека за смену. |
| `RnNumber` | `string` | Регистрационный номер ККТ (РНМ). |
| `FnNumber` | `string` | Номер ФН. |
| `FnsUrl` | `string` | Адрес сайта ФНС. |
| `ServerDateTime` | `string` | Время на сервере ККМ. |
| `FiscalDateTime` | `string` | Дата и время документа по часам ФН. |
| `DeviceDateTime` | `string` | Время ККТ. |
| `CurrentShiftState` | `ShiftState` | Состояние смены: Closed / Opened / Expired. |
| `CashBalance` | `number` | Остаток наличных. |
| `BacklogDocumentsCount` | `number` | Количество непереданных в ОФД документов. |
| `BacklogFirstDocumentNumber` | `number` | Номер первого непереданного документа. |
| `BacklogFirstDocumentDateTime` | `string` | Дата и время первого непереданного документа. |
| `FnValidityDate` | `string` | Срок действия ФН. |
| `FnDaysResources` | `number` | Остаток ресурса ФН в днях. |
| `IsFnPresent` | `boolean` | ФН присутствует. |
| `IsFiscal` | `boolean` | Фискальный режим. |
| `FnWarnings` | `Warnings` | Предупреждения ФН из ответа. |
| `Devices` | `DeviceListResponse[]` | Список устройств. |
| `Kkt` | `DataKkt` | Подробные данные кассы после `Connect()`. |
| `Status` | `KktStatus` | Расширенный статус ККТ. |
| `ShiftStatus` | `ResponseCurrentStatus` | Краткий статус смены. |
| `ShiftTotals` | `ResShiftTotal` | Итоги смены. |
| `LineLength` | `number` | Ширина строки чека в символах. |
| `LineLengthPixels` | `number` | Ширина печатной области в пикселях. |
| `NonZeroSum` | `number` | Необнуляемая сумма. |
| `ServerVersion` | `string` | Версия сервера. |
| `MarkingCheck` | `RequestKmResult` | Результат локальной проверки КМ. |
| `MarkingProcessing` | `ProcessingKmResult` | Результат проверки КМ в ОИСМ. |
| `Check` | `CheckDocument` | Документ (чек) по идентификатору. |
| `Checks` | `CheckDocument[]` | Список документов. |
| `TaskStatus` | `ResponseTaskStatus` | Статус асинхронного задания. |
| `PrintForm` | `PrintFormLine[]` | Печатная форма. |
| `Pictures` | `Picture[]` | Список картинок. |
| `Shifts` | `ShiftListItem[]` | Список отчётов / смен. |
| `Queue` | `QueueItem[]` | Очередь печати. |
| `QueueTask` | `QueueTaskState` | Состояние задания очереди. |
| `Operation` | `DeviceTaskInfo` | Операция по идентификатору документа. |
| `Operations` | `OperationListItem[]` | Список операций за период. |
| `RelatedOperations` | `DeviceTaskInfo[]` | Связанные операции. |
| `OperationHistory` | `OperationHistoryItem[]` | История выполнения операции. |
| `OperationTlv` | `string` | TLV операции. |
| `OperationKm` | `OperationKmRow[]` | Коды маркировки операции. |
| `UserToken` | `UserToken` | Токен пользователя (`GetUserToken`). |
| `Users` | `ServiceUser[]` | Список пользователей. |
| `ServiceSettingsResult` | `ServiceSettings` | Настройки службы после чтения. |
| `Pools` | `string[]` | Список пулов. |
| `PrintTemplate` | `PrintTemplate` | Шаблон печати. |
| `Templates` | `PrintTemplate[]` | Список шаблонов печати. |
| `CheckTemplate` | `CheckTemplate` | Шаблон чека. |
| `CheckTemplates` | `CheckTemplateListItem[]` | Список шаблонов чека. |
| `FiscalizationDocument` | `FiscalizationDocument` | Документ фискализации. |
| `Fiscalizations` | `FiscalizationDocument[]` | Список фискализаций. |
| `MarkingVerify` | `MarkingVerifyResult` | Результат проверки маркировки. |
| `PictureBase64Result` | `string` | Картинка в Base64 (результат чтения). |

Ограничения:

- один экземпляр `ServerKkm` не рассчитан на параллельные запросы к разным кассам одновременно — на параллельную работу создавайте отдельные экземпляры;
- коннектор не валидирует состав чека — неверные данные отвергнет сервер;
- после `dispose()` экземпляр использовать нельзя;
- текущий запрос можно прервать методом `kkm.cancel()`.

## 3.2 Типы данных

### 3.2.1 Позиции чека (`Positions`)

#### `FiscalLine` — фискальная строка

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Name` | `string` | Наименование позиции. |
| `ProductCode` | `string` | Код товара. |
| `Quantity` | `number` | Количество. По умолчанию `1`. |
| `PriceWithDiscount` | `number` | Цена с учётом скидки. |
| `SumWithDiscount` | `number` | Сумма с учётом скидки. |
| `DiscountSum` | `number` | Сумма скидки / надбавки. |
| `Tax` | `string` | Ставка НДС. Обязательна. |
| `TaxSum` | `number` | Сумма НДС. |
| `Department` | `number` | Отдел / секция. |
| `SignMethodCalculation` | `SignMethodCalculation` | Признак способа расчёта: NotApplicable - Не применяется; FullPrepayment - Предоплата полная; PartialPrepayment - Предоплата частичная; Advance - Аванс; FullPayment - Полная оплата; PartialPaymentAndCredit - Частичная оплата и кредит; CreditTransfer - Передача в кредит; CreditPayment - Оплата кредита |
| `SignCalculationObject` | `SignCalculationObject` | Признак предмета расчёта: NotApplicable - Не применяется; Goods - Товар; ExcisableGoods - Подакцизный товар; Work - Работа; Service - Услуга; GamblingStake - Ставка (азартные игры); GamblingPrize - Выигрыш (азартные игры); LotteryTicket - Лотерейный билет или ставка; LotteryPrize - Выигрыш в лотерее; IntellectualProperty - Право на использование РИД; Advance - Аванс, задаток, предоплата; AgentFee - Агентское вознаграждение; Payout - Выплата; Other - Иной предмет расчёта; PropertyRight - Имущественное право; NonOperatingIncome - Внереализационный доход; OtherPayments - Иные платежи и взносы; TradeFee - Торговый сбор; TouristTax - Туристический налог; Deposit - Залог; Expense - Расход; PensionContributionIp - Взносы на ОПС ИП; PensionContribution - Взносы на ОПС; MedicalContributionIp - Взносы на ОМС ИП; MedicalContribution - Взносы на ОМС; SocialContribution - Взносы на ОСС; CasinoPayment - Платёж казино; CashWithdrawalByAgent - Выдача денежных средств агентом; АТНМ - Подакцизный маркированный товар без кода; АТМ - Подакцизный маркированный товар с кодом; ТНМ - Маркированный товар без кода, не подакцизный; ТМ - Маркированный товар с кодом, не подакцизный |
| `MeasurementUnit` | `string` | Единица измерения. |
| `MeasureOfQuantity` | `MeasureOfQuantity` | Мера количества предмета расчёта: Piece - Штука; Gram - Грамм; Kilogram - Килограмм; Tonne - Тонна; Centimeter - Сантиметр; Decimeter - Дециметр; Meter - Метр; SquareCentimeter - Квадратный сантиметр; SquareDecimeter - Квадратный дециметр; SquareMeter - Квадратный метр; Milliliter - Миллилитр; Liter - Литр; CubicMeter - Кубический метр; KilowattHour - Киловатт-час; Gigacalorie - Гигакалория; Day - Сутки; Hour - Час; Minute - Минута; Second - Секунда; Kilobyte - Килобайт; Megabyte - Мегабайт; Gigabyte - Гигабайт; Terabyte - Терабайт; Other - Иная единица измерения |
| `ExciseAmount` | `number` | Сумма акциза. |
| `CountryOfOrigin` | `string` | Код страны происхождения. |
| `CustomsDeclaration` | `string` | Номер таможенной декларации. |
| `SignSubjectCalculationAgent` | `AgentType` | Признак агента по предмету расчёта. BankPaymentAgent - Банковский платежный агент; BankPaymentSubagent - Банковский платежный субагент; PaymentAgent - Платежный агент; PaymentSubagent - Платёжный субагент; Attorney - Поверенный; Commissioner - Комиссионер; Agent - Агент (иной тип) |
| `AgentData` | `Agent` | Данные агента. |
| `Vendor` | `Vendor` | Данные поставщика. |
| `GoodCodeData` | `Marking` | Код товарной номенклатуры. |
| `MarkingCode` | `string` | Код контрольной марки. |
| `FractionalQuantity` | `FractionalQuantity` | Дробное количество. |
| `IndustryAttribute` | `Industry` | Отраслевой реквизит позиции. |
| `AdditionalAttribute` | `string` | Дополнительный реквизит предмета расчёта. |

#### `TextLine` — текстовая строка

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Text` | `string` | Текст строки. |
| `Font` | `string` | Шрифт: normal - обычный; bold - жирный; small - мелкий; medium - средний; big - крупный; H1-H5 - заголовки разного уровня. |
| `Alignment` | `string` | Выравнивание: left; center; right; width. |

#### `BarcodeLine` — штрихкод

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Type` | `string` | Тип штрихкода: QR; EAN13; EAN8; CODE39; CODE93; CODE128; UPCA; UPCE; ITF; CODABAR; PDF417; CODE32. |
| `Value` | `string` | Значение штрихкода. |
| `ValueBase64` | `string` | Значение штрихкода в Base64 (если передаёте закодированную строку). |
| `Alignment` | `string` | Выравнивание: left; center; right; width. |



#### `PictureLine` — картинка в чеке

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Value` | `string` | Изображение в Base64. |
| `Alignment` | `PictureAlignment` | Выравнивание: Left - слева; Center - по центру; Right - справа. По умолчанию Center. |
| `Width` | `number` | Ширина изображения (при необходимости). |
| `Height` | `number` | Высота изображения (при необходимости). |

#### `SeparatorLine` — разделительная линия

| Свойство | Тип | Описание |
| --- | --- | --- |
| `lineStyle` | `LineStyle` | Стиль линии: Solid — сплошная (по умолчанию); Bold — жирная; Dashed — штриховая; Dotted — пунктирная; Double — двойная. |

### 3.2.2 `Payments` — Оплаты

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Cash` | `number` | Наличная оплата. |
| `ElectronicPayment` | `number` | Безналичная оплата. |
| `AdvancePayment` | `number` | Предоплата (зачёт аванса). |
| `Credit` | `number` | Постоплата (в кредит). |
| `CashProvision` | `number` | Встречное предоставление (бартер). |

### 3.2.3 `Customer` — Покупатель

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Info` | `string` | Наименование организации или ФИО. |
| `Vatin` | `string` | ИНН покупателя. |
| `Email` | `string` | Email. |
| `Phone` | `string` | Телефон. |
| `DateOfBirth` | `string` | Дата рождения (`DD.MM.YYYY`). |
| `Citizenship` | `string` | Код страны (ОКСМ). |
| `DocumentTypeCode` | `string` | Код вида документа (таблица 116 ФФД). |
| `DocumentData` | `string` | Данные документа, удостоверяющего личность. |
| `Address` | `string` | Адрес покупателя. |

### 3.2.4 `Cashier` — Кассир

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Name` | `string` | ФИО кассира. |
| `Vatin` | `string` | ИНН кассира. |

### 3.2.5 `CorrectionData` — Коррекция

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Type` | `CorrectionTypes` | Самостоятельно - Самостоятельно; ПоПредписанию - По предписанию налогового органа. |
| `Description` | `string` | Описание (основание) коррекции. |
| `Date` | `string` | Дата совершения корректируемого расчёта. |
| `Number` | `string` | Номер предписания налогового органа. При самостоятельной коррекции можно указать `"0"`. |

### 3.2.6 `Agent` — Агент

| Свойство | Тип | Описание |
| --- | --- | --- |
| `PayingAgentOperation` | `string` | Операция платёжного агента (тег 1044). |
| `PayingAgentPhone` | `string[]` | Телефон платёжного агента (тег 1073). |
| `ReceivePaymentsOperatorPhone` | `string[]` | Телефон оператора по приёму платежей (тег 1074). |
| `MoneyTransferOperatorPhone` | `string[]` | Телефон оператора перевода (тег 1075). |
| `MoneyTransferOperatorName` | `string` | Наименование оператора перевода. |
| `MoneyTransferOperatorAddress` | `string` | Адрес оператора перевода (тег 1005). |
| `MoneyTransferOperatorVatin` | `string` | ИНН оператора перевода. |

### 3.2.7 `Vendor` — Поставщик

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Name` | `string` | Наименование поставщика. |
| `Phones` | `string[]` | Телефоны поставщика. |
| `Vatin` | `string` | ИНН поставщика. |

### 3.2.8 `Industry` — Отраслевой реквизит

| Свойство | Тип | Описание |
| --- | --- | --- |
| `IdentifierFoiv` | `string` | Идентификатор ФОИВ (тег 1262). |
| `DocumentDate` | `string` | Дата документа-основания (`DD.MM.YYYY`). |
| `DocumentNumber` | `string` | Номер документа-основания. |
| `AttributeValue` | `string` | Значение отраслевого реквизита. |

### 3.2.9 `UserAttribute` — Пользовательский реквизит

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Name` | `string` | Имя реквизита. |
| `Value` | `string` | Значение реквизита. |

### 3.2.10 `OperationalAttribute` — Операционный реквизит

| Свойство | Тип | Описание |
| --- | --- | --- |
| `DateTime` | `string` | Дата и время операции. Формат: `"ЧЧ:ММ:СС ДД.ММ.ГГГГ"` (тег 1273 ФФД). |
| `OperationId` | `number` | Идентификатор операции. |
| `OperationData` | `string` | Данные операции. |

### 3.2.11 `FractionalQuantity` — Дробное количество предмета расчёта

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Numerator` | `number` | Числитель. |
| `Denominator` | `number` | Знаменатель (не должен быть 0). |

### 3.2.12 `ElectronicPayment` — Безналичная оплата

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Amount` | `number` | Сумма оплаты безналичными. |
| `PaymentMethod` | `ElectronicPaymentMethod` | Признак способа оплаты: FullPrepayment - Предоплата 100%; PartialPrepayment - Предоплата; Advance - Аванс; FullPayment - Полный расчёт; PartialPaymentAndCredit - Частичный расчёт и кредит; CreditTransfer - Передача в кредит; CreditPayment - Оплата кредита. |
| `Identifiers` | `string` | Идентификаторы безналичной оплаты. |
| `AdditionalInformation` | `string` | Дополнительные сведения. |

### 3.2.13 `Marking` — Позиции маркировки

| Свойство | Тип | Описание |
| --- | --- | --- |
| `Gtin` | `string` | GTIN |
| `StampType` | `string` | Тип маркировки |
| `Stamp` | `string` | Контрольный идентификационный знак (КИЗ). |
| `SerialNumber` | `string` | Серийный номер. |
| `Code` | `string` | Код контрольной марки в Base64 |
| `Barcode` | `string` | Штрихкод. |
| `CommodityGroup` | `string` | Тип (группа) товара. |
| `NotIdentified` | `string` | Код товара, формат которого не идентифицирован (Base64). |
| `Ean8` | `string` | Код товара в формате EAN-8 (Base64) |
| `Ean13` | `string` | Код товара в формате EAN-13 (Base64) |
| `Itf14` | `string` | Код товара в формате ITF-14 (Base64) |
| `Gs10` | `string` | Код GS1 на товаре без маркировки (Base64) |
| `GS1M` | `string` | Код GS1 на товаре с маркировкой (Base64) |
| `Kmk` | `string` | Короткий код маркировки (Base64) |
| `Mi` | `string` | КИЗ мехового изделия |
| `Egais20` | `string` | Код товара в формате ЕГАИС-2.0 |
| `Egais30` | `string` | Код товара в формате ЕГАИС-3.0 |
| `F1`–`F6` | `string` | Код товара в форматах Ф.1–Ф.6 (Base64) |

### 3.2.14 `Correction105Taxes` — Ставки НДС для коррекции ФФД 1.0.5

| Свойство | Тип | Описание |
| --- | --- | --- |
| `SumTax0` | `number` | Сумма расчёта по ставке НДС 0%. |
| `SumTax5` | `number` | Сумма НДС по ставке 5%. |
| `SumTax7` | `number` | Сумма НДС по ставке 7%. |
| `SumTax10` | `number` | Сумма НДС по ставке 10%. |
| `SumTax18` | `number` | Сумма НДС по ставке 18%. |
| `SumTax20` | `number` | Сумма НДС по ставке 20%. |
| `SumTax22` | `number` | Сумма НДС по ставке 22%. |
| `SumTaxNone` | `number` | Сумма расчёта без НДС. |
| `SumTax105` | `number` | Сумма НДС по расчётной ставке 5/105. |
| `SumTax107` | `number` | Сумма НДС по расчётной ставке 7/107. |
| `SumTax110` | `number` | Сумма НДС по расчётной ставке 10/110. |
| `SumTax118` | `number` | Сумма НДС по расчётной ставке 18/118. |
| `SumTax120` | `number` | Сумма НДС по расчётной ставке 20/120. |
| `SumTax122` | `number` | Сумма НДС по расчётной ставке 22/122. |

# 4. Варианты интеграции

## 4.1. Локальный пакет (`.tgz`) 

Обычный способ поставки клиенту. Пакет `skkmconnectorts` ставится из локального архива, собранного через `npm pack` (в репозитории коннектора после сборки появляется `skkmconnectorts-1.0.0.tgz`).

```bash
npm install /путь/до/коннектора/skkmconnectorts-1.0.0.tgz
```

В `package.json` появится:

```json
"dependencies": {
  "skkmconnectorts": "file:../skkmconnectorts-1.0.0.tgz"
}
```

Собрать пакет из исходников:

```bash
cd SKKMConnectorTS
npm run build
npm pack
```

## 4.2. Ссылка на проект (`file:`)

Удобно, когда коннектор лежит рядом и правится вместе с приложением:

```json
"dependencies": {
  "skkmconnectorts": "file:../skkmconnectorts"
}
```

```bash
npm install
```

При этом способе после каждой правки в коннекторе нужен `npm run build` (в отличие от JS-версии, TS-пакет требует пересборки — компилируется `dist/` из `src/`).

# 5. Пример работы с ККТ

```ts
// 1. Создаём объект коннектора
const kkm = new ServerKkm();

// 2. Настраиваем параметры подключения
// 2.1. Хост и порт (порт по умолчанию — 4398)
kkm.Host = "127.0.0.1";
kkm.Port = 4398;

// 2.2. Имя ККМ, заданное на стороне сервера ККМ
kkm.DeviceName = "Atol";

// 2.3. Токен авторизации из профиля пользователя сервера ККМ
kkm.Token = "a6261fa7-6675-41c6-a9f5-cee920e1d71c";

kkm.Cashier = new Cashier();
kkm.Cashier.Name = "Иванов А.И.";

// 3. Подключение: при успехе параметры ККМ уже в свойствах
await kkm.Connect();

// 4. Анализируем ответ — обработчик уже разложил Ok/ErrorCode/ErrorDescription и LastResult
if (kkm.Ok) {
    console.log(`Длина строки: ${kkm.LineLength}, место: ${kkm.SaleLocation}, ФФД: ${kkm.Kkt?.Device?.FfdVersion}`);
} else {
    console.log(`${kkm.ErrorCode}: ${kkm.ErrorDescription}`);
}
```

Если подключение прошло успешно — можно вызывать методы работы с ККТ:

```ts
// 5. Открываем кассовую смену
await kkm.OpenShift();

if (kkm.Ok) {
    console.log(`Смена открыта: ${kkm.ShiftNumber}`);
} else {
    console.log(`${kkm.ErrorCode}: ${kkm.ErrorDescription}`);
}
```

Пример печати чека прихода:

```ts
// 6. Новый запрос: очищает позиции, оплаты и результат прошлого вызова
kkm.NewRequest();
kkm.PaymentType = CheckType.Sale;
kkm.TaxVariant = TaxSystem.ОСН;
kkm.Electronically = false;

kkm.Customer = new Customer();
kkm.Customer.Info = "ООО «Ромашка»";
kkm.Customer.Vatin = "500100732259";
kkm.Customer.Email = "client@example.com";

// Фискальная позиция
const line = new FiscalLine();
line.Name = "Кофе американо";
line.ProductCode = "CF-AM-001";
line.Quantity = 1;
line.PriceWithDiscount = 150;
line.SumWithDiscount = 150;
line.Tax = "20";
line.TaxSum = 25;
line.Department = 1;
line.SignMethodCalculation = SignMethodCalculation.FullPayment;
line.SignCalculationObject = SignCalculationObject.Service;
line.MeasureOfQuantity = MeasureOfQuantity.Piece;
line.MeasurementUnit = "шт";
kkm.Positions.push(line);

const payments = new Payments();
payments.Cash = 150;
kkm.Payments = payments;

await kkm.PrintCheck();

if (kkm.Ok) {
    // ФП, смена, docId — из свойств после разбора Result
    console.log(`ФП: ${kkm.FiscalSign}, смена: ${kkm.ShiftNumber}, docId: ${kkm.DocumentId}`);
} else {
    console.log(`${kkm.ErrorCode}: ${kkm.ErrorDescription}`);
}
```

Остальные операции устроены так же: смена (`OpenShift`, `CloseShift`, `ReportX`), возврат и коррекция (`PrintCheck` / `PrintCheckCorrection105` / `PrintCheckCorrection120`), наличные (`CashIn`, `CashOut`), слип, картинки, маркировка.


## Полный API

Свойства, методы и перечисления коннектора повторяют REST API Сервера ККМ.

- **Справочник по коннектору:** [`API.md`](API.md) — методы, эндпоинты, входные параметры, перечисления и свойства-результаты.
- **Встроенная документация сервера:** в интерфейсе Сервера ККМ — «Помощь» → «REST API».

Подсказки по каждому свойству и методу доступны из JSDoc-комментариев прямо в `.ts`-файлах — большинство редакторов (VS Code, WebStorm) показывают их при наведении.