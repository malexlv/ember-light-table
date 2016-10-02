import Ember from 'ember';
import layout from '../templates/components/lt-column-resizer';

const {
  $,
  computed
} = Ember;

export default Ember.Component.extend({
  layout,
  classNameBindings: [':lt-column-resizer', 'isResizing'],
  column: null,
  resizeOnDrag: false,

  isResizing: false,
  startWidth: null,
  startX: null,

  $column: computed(function() {
    return $(this.get('element')).parent('th');
  }).volatile().readOnly(),

  didInsertElement() {
    this._super(...arguments);

    this.__mouseMove = this._mouseMove.bind(this);
    this.__mouseUp = this._mouseUp.bind(this);

    $(document).on('mousemove', this.__mouseMove);
    $(document).on('mouseup', this.__mouseUp);
  },

  willDestroyElement() {
    this._super(...arguments);

    $(document).off('mousemove', this.__mouseMove);
    $(document).off('mouseup', this.__mouseUp);
  },

  click(e) {
    /*
      Prevent click events from propagating (i.e. onColumnClick)
     */
    e.preventDefault();
    e.stopPropagation();
  },

  mouseDown(e) {
    const $column = this.get('$column');

    e.preventDefault();
    e.stopPropagation();

    this.setProperties({
      isResizing: true,
      startWidth: $column.width(),
      startX: e.pageX
    });
  },

  _mouseUp(e) {
    if(this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      const $column = this.get('$column');
      const column = this.get('column');
      let width = `${$column.width()}px`;

      this.set('isResizing', false);
      column.set('width', width);
      this.sendAction('onColumnResized', column, width, ...arguments);
    }
  },

  _mouseMove(e) {
    if(this.get('isResizing')) {
      e.preventDefault();
      e.stopPropagation();

      const resizeOnDrag = this.get('resizeOnDrag');
      const $column = this.get('$column');
      const { startX, startWidth } = this.getProperties(['startX', 'startWidth']);
      const width = startWidth + (e.pageX - startX);

      if(resizeOnDrag) {
        this.set('column.width', `${width}px`);
      } else {
        $column.width(`${width}px`);
      }
    }
  }
});
