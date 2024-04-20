export type SortOrder = 'descend' | 'ascend' | null

export type TableColumnsType = {
  key: string
  title: string
  dataIndex?: string | number | readonly (string | number)[]
  sorter?:
    | boolean
    | {
        compare?: (a: Record<string, any>, b: Record<string, any>, sortOrder?: SortOrder) => number
        /** Config multiple sorter order priority */
        multiple?: number
      }
  colSpan?: number
  rowSpan?: number
  width?: number | string
  maxWidth?: number
  minWidth?: number
  resizable?: boolean
  fixed?: 'left' | 'right' | boolean
  align?: 'left' | 'right' | 'center'
}
