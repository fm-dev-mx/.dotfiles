import { S as SvelteComponent, y as init$2, p as initProfileHooks, z as safe_not_equal, B as append_styles, C as create_component, D as mount_component, E as noop, F as transition_in, G as transition_out, H as destroy_component } from '../profile-hook-c22d6069.js';
import { q as q_ } from '../App-7aec48dc.js';

function f(t){append_styles(t,"svelte-rgsz0b","body{height:500px;width:620px !important}:root{--app-content-width:580px;--top-bar-width:585px;--profiles-list-min-height:360px}");}function h(t){let s,a;return s=new q_({}),{c(){create_component(s.$$.fragment);},m(t,o){mount_component(s,t,o),a=!0;},p:noop,i(t){a||(transition_in(s.$$.fragment,t),a=!0);},o(t){transition_out(s.$$.fragment,t),a=!1;},d(t){destroy_component(s,t);}}}initProfileHooks();const l=new class extends SvelteComponent{constructor(t){super(),init$2(this,t,null,h,safe_not_equal,{},f);}}({target:document.body});

export { l as default };
