import { useEffect } from 'react';
import { Tag, Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useMoney } from '@/settings';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import useOnFetch from '@/hooks/useOnFetch';
import RecentTable from './components/RecentTable';
import SummaryCard from './components/SummaryCard';
import PreviewCard from './components/PreviewCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';

export default function DashboardModule() {
  const translate = useLanguage();
  const { moneyFormatter } = useMoney();
  const money_format_settings = useSelector(selectMoneyFormat);

  const getStatsData = async ({ entity, currency }) => {
    return await request.summary({
      entity,
      options: { currency },
    });
  };

  const {
    result: invoiceResult,
    isLoading: invoiceLoading,
    onFetch: fetchInvoicesStats,
  } = useOnFetch();

  const { result: quoteResult, isLoading: quoteLoading, onFetch: fetchQuotesStats } = useOnFetch();

  const {
    result: paymentResult,
    isLoading: paymentLoading,
    onFetch: fetchPaymentsStats,
  } = useOnFetch();

  const { result: clientResult, isLoading: clientLoading } = useFetch(() =>
    request.summary({ entity: 'client' })
  );

  useEffect(() => {
    const currency = money_format_settings.default_currency_code || null;

    if (currency) {
      fetchInvoicesStats(getStatsData({ entity: 'invoice', currency }));
      fetchQuotesStats(getStatsData({ entity: 'quote', currency }));
      fetchPaymentsStats(getStatsData({ entity: 'payment', currency }));
    }
  }, [money_format_settings.default_currency_code]);

  const dataTableColumns = [
    {
      title: translate('number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Total'),
      dataIndex: 'total',
      onCell: () => {
        return {
          style: {
            textAlign: 'right',
            whiteSpace: 'nowrap',
            direction: 'ltr',
          },
        };
      },
      render: (total, record) => (
        <span className="text-white">
          {moneyFormatter({ amount: total, currency_code: record.currency })}
        </span>
      ),
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
  ];

  const entityData = [
    {
      result: invoiceResult,
      isLoading: invoiceLoading,
      entity: 'invoice',
      title: translate('Invoices'),
    },
    {
      result: quoteResult,
      isLoading: quoteLoading,
      entity: 'quote',
      title: translate('quote'),
    },
  ];

  const statisticCards = entityData.map((data, index) => {
    const { result, entity, isLoading, title } = data;

    return (
      <PreviewCard
        key={index}
        title={title}
        isLoading={isLoading}
        entity={entity}
        statistics={
          !isLoading &&
          result?.performance?.map((item) => ({
            tag: item?.status,
            color: 'blue',
            value: item?.percentage,
          }))
        }
      />
    );
  });

  if (money_format_settings) {
    return (
      <>
        <Row gutter={[32, 32]} className="bg-gray-900 text-white p-6 rounded-lg">
          <SummaryCard
            title={translate('Invoices')}
            prefix={translate('This month')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total}
            className="bg-gray-800 text-white"
          />
          <SummaryCard
            title={translate('Quote')}
            prefix={translate('This month')}
            isLoading={quoteLoading}
            data={quoteResult?.total}
            className="bg-gray-800 text-white"
          />
          <SummaryCard
            title={translate('paid')}
            prefix={translate('This month')}
            isLoading={paymentLoading}
            data={paymentResult?.total}
            className="bg-gray-800 text-white"
          />
          <SummaryCard
            title={translate('Unpaid')}
            prefix={translate('Not Paid')}
            isLoading={invoiceLoading}
            data={invoiceResult?.total_undue}
            className="bg-gray-800 text-white"
          />
        </Row>
        <div className="my-7"></div>
        <Row gutter={[32, 32]}>
          <Col className="w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
            <div className="bg-gray-800 shadow-lg rounded-lg h-[458px] p-5">
              <Row className="gap-0">{statisticCards}</Row>
            </div>
          </Col>
          <Col className="w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
            <CustomerPreviewCard
              isLoading={clientLoading}
              activeCustomer={clientResult?.active}
              newCustomer={clientResult?.new}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-5"
            />
          </Col>
        </Row>
        <div className="my-7"></div>
        <Row gutter={[32, 32]}>
          <Col className="w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
            <div className="bg-gray-800 shadow-lg rounded-lg h-full p-5">
              <h3 className="text-white mb-5 px-5">{translate('Recent Invoices')}</h3>
              <RecentTable entity={'invoice'} dataTableColumns={dataTableColumns} />
            </div>
          </Col>
          <Col className="w-full" sm={{ span: 24 }} lg={{ span: 12 }}>
            <div className="bg-gray-800 shadow-lg rounded-lg h-full p-5">
              <h3 className="text-white mb-5 px-5">{translate('Recent Quotes')}</h3>
              <RecentTable entity={'quote'} dataTableColumns={dataTableColumns} />
            </div>
          </Col>
        </Row>
      </>
    );
  } else {
    return <></>;
  }
}
