import { S as SvelteComponent, y as init$2, p as initProfileHooks, z as safe_not_equal, B as append_styles, C as create_component, D as mount_component, E as noop, F as transition_in, G as transition_out, H as destroy_component } from '../profile-hook-c22d6069.js';
import { q as q_ } from '../App-7aec48dc.js';

function f(t){append_styles(t,"svelte-1qxpon2","body{height:100%;width:100%}:root{--app-content-width:calc(100% - 40px);--top-bar-width:calc(100% - 35px);--profiles-list-min-height:inherit}");}function h(t){let s,a;return s=new q_({}),{c(){create_component(s.$$.fragment);},m(t,e){mount_component(s,t,e),a=!0;},p:noop,i(t){a||(transition_in(s.$$.fragment,t),a=!0);},o(t){transition_out(s.$$.fragment,t),a=!1;},d(t){destroy_component(s,t);}}}initProfileHooks();const m=new class extends SvelteComponent{constructor(t){super(),init$2(this,t,null,h,safe_not_equal,{},f);}}({target:document.body});

export { m as default };
