import { h } from 'vue';
import { Badge } from '@/components/ui/badge';
import DropDownAction from './data-table-dropdown.vue';
import { Status } from '@/types/client/payment-status.interface';
import { AdminPaymentStatus } from '@/types/admin/admin-payment-status.interface';

// @ts-ignore
import { ColumnDef } from '@tanstack/vue-table';

const statusBadgeClassMap: Record<Status, string> = {
  pending: 'bg-yellow-500 text-white hover:bg-yellow-600',
  succeeded: 'bg-green-500 text-white hover:bg-green-600',
  canceled: 'bg-red-500 text-white hover:bg-red-600',
};

const statusBadgeTextMap: Record<Status, string> = {
  pending: 'в ожидании',
  succeeded: 'оплачено',
  canceled: 'отменено',
};

export const columns: ColumnDef<AdminPaymentStatus>[] = [
  {
    accessorKey: 'payment_status',
    header: () => h('div', { class: 'text-center' }, 'Статус'),
    cell: ({ row }: any) => {
      const status = row.getValue('payment_status') as Status;
      const badgeClass = statusBadgeClassMap[status];
      return h(
        'div',
        { class: 'flex justify-center' },
        h(
          Badge,
          { class: `text-right font-medium ${badgeClass}` },
          { default: () => statusBadgeTextMap[status] }
        )
      );
    },
  },
  {
    accessorKey: 'payment_id',
    header: () => h('div', { class: 'text-right' }, 'TX-ID'),
    cell: ({ row }: any) =>
      h('div', { class: 'text-right' }, row.getValue('payment_id')),
  },
  {
    accessorKey: 'buyer',
    header: () => h('div', { class: 'text-right' }, 'Имя'),
    cell: ({ row }: any) => {
      const buyer = row.getValue('buyer');
      return h('div', { class: 'text-right' }, buyer.first_name);
    },
  },
  {
    accessorKey: 'buyer',
    header: () => h('div', { class: 'text-right' }, 'Фамилия'),
    cell: ({ row }: any) => {
      const buyer = row.getValue('buyer');
      return h('div', { class: 'text-right' }, buyer.last_name);
    },
  },
  {
    accessorKey: 'total',
    header: () => h('div', { class: 'text-right' }, 'Сумма'),
    cell: ({ row }: any) => {
      const amount = Number.parseFloat(row.getValue('total'));
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(amount);
      return h('div', { class: 'text-right font-medium' }, formatted);
    },
  },
  {
    accessorKey: 'created_at',
    header: () => h('div', { class: 'text-right' }, 'Создано в'),
    cell: ({ row }: any) => {
      const date = new Date(row.getValue('created_at'));
      return h(
        'div',
        { class: 'text-right font-medium' },
        date.toLocaleString()
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }: any) => {
      const payment = row.original;
      return h(
        'div',
        { class: 'relative' },
        h(DropDownAction, {
          payment,
          onActionPerformed: () => {
            row.table.props.onActionPerformed();
          },
        })
      );
    },
  },
];
