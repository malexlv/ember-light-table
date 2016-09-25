import Ember from 'ember';
import layout from 'ember-light-table/templates/components/columns/base';
import DraggableColumnMixin from 'ember-light-table/mixins/draggable-column';

const {
  Component,
  computed,
  isEmpty,
  String: { htmlSafe }
} = Ember;

/**
 * @module Light Table
 * @submodule Column Types
 */

/**
 * @module Column Types
 * @class Base Column
 */

const Column = Component.extend(DraggableColumnMixin, {
  layout,
  tagName: 'th',
  classNames: ['lt-column'],
  attributeBindings: ['style', 'colspan', 'rowspan'],
  classNameBindings: ['align', 'isGroupColumn:lt-group-column', 'isHideable', 'isSortable', 'isSorted', 'isResizable', 'isDraggable', 'column.classNames'],

  width: computed.readOnly('column.width'),
  isGroupColumn: computed.readOnly('column.isGroupColumn'),
  isSortable: computed.readOnly('column.sortable'),
  isSorted: computed.readOnly('column.sorted'),
  isHideable: computed.readOnly('column.hideable'),
  isResizable: computed.readOnly('column.resizable'),
  isDraggable: computed.readOnly('column.draggable'),

  style: computed('width', function() {
    const width = this.get('width');
    return htmlSafe(width ? `width: ${this.get('width')}` : '');
  }).readOnly(),

  align: computed('column.align', function () {
    return `align-${this.get('column.align')}`;
  }).readOnly(),

  /**
   * @property column
   * @type {Column}
   */
  column: null,

  /**
   * @property tableActions
   * @type {Object}
   */
  tableActions: null,

  /**
   * @property sortIcons
   * @type {Object}
   */
  sortIcons: null,

  /**
   * @property colspan
   * @type {Number}
   */
  colspan: computed('column', 'column.visibleSubColumns.[]', function () {
    let subColumns = this.get('column.visibleSubColumns');
    return !isEmpty(subColumns) ? subColumns.length : 1;
  }),

  /**
   * @property rowspan
   * @type {Number}
   */
  rowspan: computed('column.visibleSubColumns.[]', function () {
    let subColumns = this.get('column.visibleSubColumns');
    return !isEmpty(subColumns) ? 1 : 2;
  }),

  actions: {
    columnResized(width) {
      this.sendAction('columnResized', this.get('column'), width);
    }
  }
});

Column.reopenClass({
  positionalParams: ['column']
});

export default Column;
