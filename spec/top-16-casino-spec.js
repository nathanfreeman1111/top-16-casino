'use babel';

import Top16Casino from '../lib/top-16-casino';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Top16Casino', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('top-16-casino');
  });

  describe('when the top-16-casino:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.top-16-casino')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'top-16-casino:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.top-16-casino')).toExist();

        let top16CasinoElement = workspaceElement.querySelector('.top-16-casino');
        expect(top16CasinoElement).toExist();

        let top16CasinoPanel = atom.workspace.panelForItem(top16CasinoElement);
        expect(top16CasinoPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'top-16-casino:toggle');
        expect(top16CasinoPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.top-16-casino')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'top-16-casino:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let top16CasinoElement = workspaceElement.querySelector('.top-16-casino');
        expect(top16CasinoElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'top-16-casino:toggle');
        expect(top16CasinoElement).not.toBeVisible();
      });
    });
  });
});
