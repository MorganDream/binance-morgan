import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";

class OverallTabTable extends React.Component {
  render() {
    return (
      <ReactTable
      data={this.props.data}
      columns={[
        {
          Header: "Pair",
          accessor: "symbol"
        },
        {
          Header: "Coin",
          accessor: "baseAssetName"
        },
        {
          Header: 'Last Price',
          accessor: 'close'
        },
        {
          Header: "24h Change",
          id: "change",
          accessor: d => {return (d.close - d.open)/d.open}
        },
        {
          Header: "24h High",
          accessor: "high"
        },
        {
          Header: "24h Low",
          accessor: "low"
        },
        {
          Header: "24h Volume",
          accessor: "volume"
        },
      ]}
      getTdProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            this.props.onRowClickCallback(rowInfo);

            if (handleOriginal) {
              handleOriginal();
            }
          }
        };
      }}
      defaultPageSize={20}
      className="-striped -highlight"
      />
    )
  }
}

OverallTabTable.propTypes = {
  data: PropTypes.array,
  onRowClickCallback: PropTypes.func
};

export default OverallTabTable;
