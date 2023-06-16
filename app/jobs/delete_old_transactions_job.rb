# frozen_string_literal: true

class DeleteOldTransactionsJob < ApplicationJob
  queue_as :default

  def logger
    @logger ||= Logger.new("#{Rails.root}/log/delete_old_transactions_job.log")
  end

  def perform(*_args)
    logger.info "Started delete old transactions job at #{Time.zone.now}"

    Transaction.where('created_at < ?', 1.hour.ago).destroy_all

    logger.info "Finished delete old transactions job at #{Time.zone.now}"
  rescue StandardError => e
    logger.error "Error occurred: #{e.message}"
    raise
  end
end
