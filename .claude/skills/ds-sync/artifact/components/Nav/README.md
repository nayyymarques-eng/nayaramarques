# Nav

The sticky site header: the star mark and name on the left; Work and Services menus, About and Contact on the right.

**When to use.** Every page, once, via `<dc-import name="Nav">`. It is a site component (`Nav.dc.html`), not part of the bundle.

**Behaviour.** 57px tall (`nav-h`), sticky, translucent paper with a 20px backdrop blur. Work and Services open drop-down menus whose last item is a `rust` uppercase link (All work, Start a project); the current menu item fills with `paper-3`. Under 760px the row becomes a burger and a panel that fills the height below the header (LAY-06).

**This card** is a static rendition of the rendered desktop header, menus closed and the Work menu open. The mobile panel is not shown.
