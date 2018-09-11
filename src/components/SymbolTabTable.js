import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";

class SymbolTabTable extends React.Component {
  render() {
    return (
      <ReactTable
      data={this.props.data}
      columns={[
        {
          Header: "Price",
          accessor: "price"
        },
        {
          Header: "Amount",
          accessor: "amount"
        },
        {
          Header: "Total",
          id: 'total',
          accessor: d => d.price * d.amount
        }
      ]}
      defaultPageSize={20}
      className="-striped -highlight"
      />
    )
  }
}

SymbolTabTable.propTypes = {
  data: PropTypes.array,
};

export default SymbolTabTable;
