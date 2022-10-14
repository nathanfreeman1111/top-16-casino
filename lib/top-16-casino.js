'use babel';

import Top16CasinoView from './top-16-casino-view';
import { CompositeDisposable } from 'atom';

export default {

  top16CasinoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.top16CasinoView = new Top16CasinoView(state.top16CasinoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.top16CasinoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'top-16-casino:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.top16CasinoView.destroy();
  },

  serialize() {
    return {
      top16CasinoViewState: this.top16CasinoView.serialize()
    };
  },

  toggle() {
    console.log('Top16Casino was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
