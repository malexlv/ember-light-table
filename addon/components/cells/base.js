import Ember from 'ember';
import layout from 'ember-light-table/templates/components/cells/base';

const {
  Component,
  computed,
  String: { htmlSafe }
} = Ember;

/**
 * @module Light Table
 * @submodule Cell Types
 */

/**
 * @module Cell Types
 * @class Base Cell
 */

const Cell = Component.extend({
  layout,
  tagName: 'td',
  classNames: ['lt-cell'],
  attributeBindings: ['style'],
  classNameBindings: ['align', 'isSorted', 'column.cellClassNames'],

  width: computed.readOnly('column.width'),
  isSorted: computed.readOnly('column.sorted'),

  style: computed('width', function() {
    const width = this.get('width');
    return htmlSafe(width ? `width: ${this.get('width')}` : '');
  }).readOnly(),

  align: computed('column.align', function() {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

  /**
   * @property column
   * @type {Column}
   */
  column: null,

  /**
   * @property row
   * @type {Row}
   */
  row: null,

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * @property rawValue
   * @type {Mixed}
   */
  rawValue: null,

  /**
   * @property value
   * @type {Mixed}
   */
  value: computed('rawValue', function() {
    const rawValue = this.get('rawValue');
    const format = this.get('column.format');
    if(format && typeof format === 'function') {
      return format.call(this, rawValue);
    }
    return rawValue;
  }).readOnly()
});

Cell.reopenClass({
  positionalParams: ['column', 'row']
});

export default Cell;
