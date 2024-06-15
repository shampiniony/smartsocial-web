import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/vue-table';
import DropDownAction from './data-table-dropdown.vue';
import { h } from 'vue';
import { Status } from '@/types/client/payment-status.interface';


export interface Payment {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
}

const statusBadgeClassMap: Record<Status, string> = {
  pending: 'bg-yellow-500 text-white hover:bg-yellow-600',
  succeeded: 'bg-green-500 text-white hover:bg-green-600',
  canceled: 'bg-red-500 text-white hover:bg-red-600',
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-right' }, 'Status'),
    cell: ({ row }) => {
      const status = row.getValue<Status>('status');
      const badgeClass = statusBadgeClassMap[status];

      return h(
        Badge,
        { class: `text-right font-medium ${badgeClass}` },
        status
      );
    },
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
      }).format(amount);

      return h('div', { class: 'text-right font-medium' }, formatted);
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return h(
        'div',
        { class: 'relative' },
        h(DropDownAction, {
          payment,
        })
      );
    },
  },
];
