import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    toggleHidden: function (element) {
      $('#inventory-container').toggleClass('hidden')
    },
    deleteEntry: function (entry) {
      this.get('store').findRecord('inventory', entry.id, { reload: true }).then(
        function (entry) {
          entry.destroyRecord();
          return entry
      }).then(
        function (entry) {
          $('#datatable').DataTable().row('#row-' + entry.id).remove().draw();
      }).catch(
        () => {
        this.get('flashMessages')
        .danger('There was a problem deleting your entry. Please try again.');
      });
    }
  },
  model () {
    return this.get('store').findAll('inventory');
  },
});
