export enum ComplaintTag {
  DEPOSIT_PROCESSING_DELAY = 'DEPOSIT_PROCESSING_DELAY',
  WITHDRAWAL_PROCESSING_DELAY = 'WITHDRAWAL_PROCESSING_DELAY',
  WRONG_DEPOSIT_REJECTION_BEFORE_3_HOURS = 'WRONG_DEPOSIT_REJECTION_BEFORE_3_HOURS',
  WRONG_DEPOSIT_REJECTION_BEFORE_10_MINUTES = 'WRONG_DEPOSIT_REJECTION_BEFORE_10_MINUTES',
  APPROVED_DEPOSIT_ABOVE_LIMIT = 'APPROVED_DEPOSIT_ABOVE_LIMIT',
  APPROVED_DEPOSIT_BELOW_LIMIT = 'APPROVED_DEPOSIT_BELOW_LIMIT',
  NOT_USING_FRAUD_CHAT = 'NOT_USING_FRAUD_CHAT',
  NOT_SPECIFYING_ORIGINAL_FOR_DUPLICATES = 'NOT_SPECIFYING_ORIGINAL_FOR_DUPLICATES',
  HIGH_DEPOSIT_CANCELLATION_RATE = 'HIGH_DEPOSIT_CANCELLATION_RATE',
  HIGH_WITHDRAWAL_CANCELLATION_RATE = 'HIGH_WITHDRAWAL_CANCELLATION_RATE',
  NOT_REQUESTING_TRAFFIC_STOP = 'NOT_REQUESTING_TRAFFIC_STOP',
}

export enum ComplaintPeriod {
  WEEK = 'week',
  MONTH = 'month',
  ALL = 'all',
}

export enum AgentCountry {
  KYRGYZSTAN = 'KYRGYZSTAN',
  ETHIOPIA = 'ETHIOPIA',
}

export const complaintTagLabels: Record<ComplaintTag, string> = {
  [ComplaintTag.DEPOSIT_PROCESSING_DELAY]: 'Задержка обработки депозитов',
  [ComplaintTag.WITHDRAWAL_PROCESSING_DELAY]: 'Задержка обработки выводов',
  [ComplaintTag.WRONG_DEPOSIT_REJECTION_BEFORE_3_HOURS]: 'Неправильная отмена депозита до 3 часов',
  [ComplaintTag.WRONG_DEPOSIT_REJECTION_BEFORE_10_MINUTES]: 'Неправильная отмена депозита до 10 минут',
  [ComplaintTag.APPROVED_DEPOSIT_ABOVE_LIMIT]: 'Одобрение депозита выше лимита',
  [ComplaintTag.APPROVED_DEPOSIT_BELOW_LIMIT]: 'Одобрение депозита ниже лимита',
  [ComplaintTag.NOT_USING_FRAUD_CHAT]: 'Не использует беседу Fraud',
  [ComplaintTag.NOT_SPECIFYING_ORIGINAL_FOR_DUPLICATES]: 'Не указывает оригиналы при дубликатах',
  [ComplaintTag.HIGH_DEPOSIT_CANCELLATION_RATE]: 'Высокий процент отмен депозитов',
  [ComplaintTag.HIGH_WITHDRAWAL_CANCELLATION_RATE]: 'Высокий процент отмен выводов',
  [ComplaintTag.NOT_REQUESTING_TRAFFIC_STOP]: 'Не просит закрыть трафик при проблемах',
};
