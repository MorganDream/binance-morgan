import React from 'react';
import OverallTabTable from './OverallTabTable';
import renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import ReactDOM from 'react-dom';

import ReactTable from "react-table";

const shallowRenderer = new ShallowRenderer();

var flag = true;
function callback() {
  flag = false;
}

const data = [{symbol: 'test1', baseAssetName: 'coin1', close: 10, open: 1, high: 20, low: 0.1, volume: 200 },
{symbol: 'test2', baseAssetName: 'coin2', close: 20, open: 10, high: 23, low: 3, volume: 300}]

it('OverallTabTable Snapshot Test', () => {
  const component = renderer.create(
    <OverallTabTable data={data}/>
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

describe('Shallow Render Check', () => {
  const node = shallowRenderer.render(<OverallTabTable  data={data} onRowClickCallback={callback} />);
  const result = shallowRenderer.getRenderOutput();

  it('The rendered component should be ReactTable', () => {
    expect(result.type).toBe(ReactTable);
  })

  it('The first column accessor should be "symbol"', () =>{
    expect(result.props.columns[0].accessor).toBe('symbol');
  })

  it('prop data should be Array', () => {
    expect(result.props.data.__proto__.constructor).toBe(Array);
  })

  it('the data can be received by component', () => {
    expect(result.props.data[0].symbol).toBe('test1');
  })
})

describe('React Dom Render Check', ()=> {
  it('Callback can be triggered by click on row', () => {
    const domNode = ReactTestUtils.renderIntoDocument(<OverallTabTable  data={data} onRowClickCallback={callback} />);
    const cellNodes = ReactTestUtils.scryRenderedDOMComponentsWithClass(domNode, 'rt-td');
    expect(flag).toBe(true);
    ReactTestUtils.Simulate.click(cellNodes[0]);
    expect(flag).toBe(false);
  })

})
