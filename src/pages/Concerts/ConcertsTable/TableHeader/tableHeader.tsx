import { observer } from "mobx-react-lite";

import { DataGridHeader } from "../../../../components/DataGrid/header/dataGridHeader";
import { DataGridHeaderSummary } from "../../../../components/DataGrid/header/summary/dataGridHeaderSummary";
import { DataGridHeaderFilters } from "../../../../components/DataGrid/header/filters/dataGridHeaderFilters";

export const TableHeader = observer(function TableHeader() {
  return (
    <DataGridHeader
      summaryContent={<DataGridHeaderSummary />}
      filtersContent={<DataGridHeaderFilters />}
    />
  );
});
