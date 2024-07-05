import { ListVoucherActive } from '../component'
import ListVoucher from '../component/ListVoucher/ListVoucher'

export const items = [
  { key: '1', label: 'Vouchers còn hoạt động', children: <ListVoucherActive /> },
  { key: '2', label: 'Tất cả Vouchers', children: <ListVoucher /> }
]
