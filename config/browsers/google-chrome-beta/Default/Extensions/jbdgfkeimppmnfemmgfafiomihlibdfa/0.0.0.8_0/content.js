(function() {
  var a, b, c = [].indexOf || function(a) {
    for (var b = 0, c = this.length; b < c; b++)
      if (b in this && this[b] === a) return b;
    return -1
  };
  a = function() {
    function a(a) {
      null == a && (a = {}), this.options = {}, this.setOptions(this.default_options), this.setOptions(a)
    }
    return a.prototype.default_options = {
      selectors: ["id", "class", "tag", "nthchild"],
      prefix_tag: !1,
      attribute_blacklist: [],
      attribute_whitelist: [],
      quote_attribute_when_needed: !1,
      id_blacklist: [],
      class_blacklist: ["selected", "active"],
      class_blacklist_new: ["ng-", "active", "checked", "selected", "focused", "correct", "disable", "enable", "highlight", "over", "hvr", "cursor", "show", "focus", "pressed", "pushed", "touch", "dirty", "pristine", "require", "select", "valid", "open", "hidden", "hide", "desktop", "mobile", "tablet", "grid", "col-", "row-"]
    }, a.prototype.setOptions = function(a) {
      var b, c, d;
      null == a && (a = {}), c = [];
      for (b in a) d = a[b], this.default_options.hasOwnProperty(b) ? c.push(this.options[b] = d) : c.push(void 0);
      return c
    }, a.prototype.isElement = function(a) {
      return !(1 !== (null != a ? a.nodeType : void 0))
    }, a.prototype.getParents = function(a) {
      var b, c;
      if (c = [], this.isElement(a))
        for (b = a; this.isElement(b);) c.push(b), b = b.parentNode;
      return c
    }, a.prototype.getTagSelector = function(a) {
      return this.sanitizeItem(a.tagName.toLowerCase())
    }, a.prototype.sanitizeItem = function(a) {
      var b;
      return b = a.split("").map(function(a) {
        return ":" === a ? "\\" + ":".charCodeAt(0).toString(16).toUpperCase() + " " : /[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(a) ? "\\" + a : escape(a).replace(/\%/g, "\\")
      }), b.join("")
    }, a.prototype.sanitizeAttribute = function(a) {
      var b;
      return this.options.quote_attribute_when_needed ? this.quoteAttribute(a) : (b = a.split("").map(function(a) {
        return ":" === a ? "\\" + ":".charCodeAt(0).toString(16).toUpperCase() + " " : /[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/.test(a) ? "\\" + a : escape(a).replace(/\%/g, "\\")
      }), b.join(""))
    }, a.prototype.quoteAttribute = function(a) {
      var b, c;
      return c = !1, b = a.split("").map(function(a) {
        return ":" === a ? (c = !0, a) : "'" === a ? (c = !0, "\\" + a) : (c = c || escape(a === !a), a)
      }), c ? "'" + b.join("") + "'" : b.join("")
    }, a.prototype.getIdSelector = function(a) {
      var b, c, d, e;
      return d = this.options.prefix_tag ? this.getTagSelector(a) : "", b = a.getAttribute("id"), c = this.options.id_blacklist.concat(["", /\s/, /^\d/]), b && null != b && "" !== b && this.notInList(b, c) && (e = d + ("#" + this.sanitizeItem(b)), 1 === a.ownerDocument.querySelectorAll(e).length) ? e : null
    }, a.prototype.notInList = function(a, b) {
      return !b.find(function(b) {
        return "string" == typeof b ? b === a : b.exec(a)
      })
    }, a.prototype.getClassSelectors = function(a) {
      var b, c, d, e, f, g;
      if (g = [], b = a.getAttribute("class"), null != b && (b = b.replace(/\s+/g, " "), b = b.replace(/^\s|\s$/g, ""), "" !== b))
        for (f = b.split(/\s+/), d = 0, e = f.length; d < e; d++) c = f[d],

          this.notInList(c, this.options.class_blacklist)

          &&
          g.push("." + this.sanitizeItem(c));
      return g
    }, a.prototype.getAttributeSelectors = function(a) {
      var b, d, e, f, g, h, i, j, k, l, m, n;
      for (m = [], n = this.options.attribute_whitelist, f = 0, h = n.length; f < h; f++) d = n[f], a.hasAttribute(d) && m.push("[" + d + "=" + this.sanitizeAttribute(a.getAttribute(d)) + "]");
      for (e = this.options.attribute_blacklist.concat(["id", "class"]), j = a.attributes, g = 0, i = j.length; g < i; g++) b = j[g], k = b.nodeName, c.call(e, k) >= 0 || (l = b.nodeName, c.call(n, l) >= 0) || m.push("[" + b.nodeName + "=" + this.sanitizeAttribute(b.nodeValue) + "]");
      return m
    }, a.prototype.getNthChildSelector = function(a) {
      var b, c, d, e, f, g, h;
      if (e = a.parentNode, f = this.options.prefix_tag ? this.getTagSelector(a) : "", null != e)
        for (b = 0, h = e.childNodes, c = 0, d = h.length; c < d; c++)
          if (g = h[c], this.isElement(g) && (b++, g === a)) return f + (":nth-child(" + b + ")");
      return null
    }, a.prototype.testSelector = function(a, b) {
      var c, d;
      return c = !1, null != b && "" !== b && (d = a.ownerDocument.querySelectorAll(b), 1 === d.length && d[0] === a && (c = !0)), c
    }, a.prototype.testUniqueness = function(a, b) {
      var c, d;
      return d = a.parentNode, c = d.querySelectorAll(b), 1 === c.length && c[0] === a
    }, a.prototype.testCombinations = function(a, b, c) {
      var d, e, f, g, h, i, j, k, l, m, n, o, p;
      if (null == c && (c = this.getTagSelector(a)), !this.options.prefix_tag) {
        for (m = this.getCombinations(b), e = 0, g = m.length; e < g; e++)
          if (d = m[e], this.testSelector(a, d)) return d;
        for (n = this.getCombinations(b), f = 0, h = n.length; f < h; f++)
          if (d = n[f], this.testUniqueness(a, d)) return d
      }
      for (o = this.getCombinations(b).map(function(a) {
          return c + a
        }), k = 0, i = o.length; k < i; k++)
        if (d = o[k], this.testSelector(a, d)) return d;
      for (p = this.getCombinations(b).map(function(a) {
          return c + a
        }), l = 0, j = p.length; l < j; l++)
        if (d = p[l], this.testUniqueness(a, d)) return d;
      return null
    }, a.prototype.getUniqueSelector = function(a) {
      var b, c, d, e, f, g, h;
      for (h = this.getTagSelector(a), d = this.options.selectors, b = 0, c = d.length; b < c; b++) {
        switch (f = d[b]) {
          case "id":
            e = this.getIdSelector(a);
            break;
          case "tag":
            h && this.testUniqueness(a, h) && (e = h);
            break;
          case "class":
            g = this.getClassSelectors(a), null != g && 0 !== g.length && (e = this.testCombinations(a, g, h));
            break;
          case "attribute":
            g = this.getAttributeSelectors(a), null != g && 0 !== g.length && (e = this.testCombinations(a, g, h));
            break;
          case "nthchild":
            e = this.getNthChildSelector(a)
        }
        if (e) return e
      }
      return "*"
    }, a.prototype.getSelector = function(a) {
      var b, c, d, e, f, g, h;
      for (h = [], e = this.getParents(a), c = 0, d = e.length; c < d; c++)
        if (b = e[c], g = this.getUniqueSelector(b), null != g && (h.unshift(g), f = h.join(" > "), this.testSelector(a, f))) return f;
      return null
    }, a.prototype.getCombinations = function(a) {
      var b, c, d, e, f, g, h;
      for (null == a && (a = []), h = [
          []
        ], b = d = 0, f = a.length - 1; 0 <= f ? d <= f : d >= f; b = 0 <= f ? ++d : --d)
        for (c = e = 0, g = h.length - 1; 0 <= g ? e <= g : e >= g; c = 0 <= g ? ++e : --e) h.push(h[c].concat(a[b]));
      return h.shift(), h = h.sort(function(a, b) {
        return a.length - b.length
      }), h = h.map(function(a) {
        return a.join("")
      })
    }, a
  }(), ("undefined" != typeof define && null !== define ? define.amd : void 0) ? define([], function() {
    return a
  }) : (b = "undefined" != typeof exports && null !== exports ? exports : this, b.CssSelectorGenerator = a)
}).call(this);

const IS_DEV = false // environment
const STICKY = true // if true, selection stays on browser when it loses focus a la chrome dev tools

const SEL_MIN_WIDTH = 250 // selector box minimum width
const UI_PADDING = 2 // all visual containers

const FILTER_CLASSES = ["brush:"] // parse out js library wizardry

var selector = ""

/**
 * toggleSelection - Starts/ends the script. Occurs when the icon is clicked or hotkey is pressed.
 */
function toggleSelection() {
  var isScriptRunning = $('.sf-ui').length

  cleanup()
  if (!isScriptRunning)
    initialize()
}

/**
 * initialize - Creates DOM elements needed to operate the script
 */
function initialize() {

  $('body').append('<div class="sf-all sf-ui" id="sf-highlight"></div>')
  $('body').append('<div class="sf-all sf-ui" id="sf-selector"></div>')
  $('body').addClass('sf-cursor')

  $(document).one("mousemove.sf", identify)
  $(document).bind("mouseover.sf", identify)

  $(document).bind("click.sf", preventListeners)
  $(document).bind("mouseup.sf", preventListeners)
  $(document).bind("mousedown.sf", copySelector)
}

/**
 * cleanup - Removes all DOM elements for the script
 */
function cleanup() {
  $(document).unbind(".sf")
  $(document).bind("mouseup.sf", (e) => { // delayed removal lets us avoid clicks bubbling up
    $('body').removeClass('sf-cursor')
    $(document).unbind(".sf")
  })
  $('.sf-all').remove()
}

/**
 * preventListeners - stops propogation of mouse events
 * @param  {Event} e
 */
function preventListeners(e) {
  e.preventDefault()
  e.stopImmediatePropagation()
  e.stopPropagation()
}

/**
 * identify - highlights the given element and displays a unique CSS selector for it
 *
 * @param  {Event} e
 */
function identify(e) {
  preventListeners(e)
  var el = document.elementFromPoint(e.clientX, e.clientY)

  selector = generateSelector(el)
  $('#sf-selector').html(selector)
  drawOverlay(el)

  if (!STICKY) {
    $(el).mouseout(function() {
      $('#sf-highlight').hide()
      $('#sf-selector').hide()
    })
  }
}

/**
 * drawOverlay - draws all of the UI
 * @param  {Element} el the most top-level moused over element
 */
function drawOverlay(el) {
  var top = $(el).offset().top - $(window).scrollTop()
  var left = $(el).offset().left - $(window).scrollLeft()
  var bottom = top + $(el).outerHeight()

  // highlight box
  $('#sf-highlight').show()
    .css('width', $(el).outerWidth() + 'px')
    .css('height', $(el).outerHeight() + 'px')
    .css('top', top + 'px')
    .css('left', left + 'px')

  // selector box (x)
  var selectorLeftPad = Math.min(window.innerWidth - left, 0)

  $('#sf-selector').show().css('left', left + selectorLeftPad + 'px')
  var selectorWidth = $('#sf-selector').outerWidth()
  if (selectorWidth + left > window.innerWidth)
    $('#sf-selector').css('left', window.innerWidth - selectorWidth + 'px')

  // selector box (y)
  var selectorTop = top - $('#sf-selector').outerHeight() - UI_PADDING
  var selectorBottom = bottom + UI_PADDING

  var selectorPos = UI_PADDING
  if (selectorTop > 0)
    selectorPos = selectorTop
  else if (selectorBottom + $('#sf-selector').outerHeight() < $(window).outerHeight())
    selectorPos = selectorBottom

  $('#sf-selector').css('top', selectorPos + 'px')
}

/**
 * generateSelector - creates a unique css selector for the given element
 *
 * @param  {Element} el The DOM element
 * @return {String} Unique CSS selector
 */
function generateSelector(el) {
  try {
  var selector = ""
  var tree = $(el).parentsUntil(document);

  // generate full selector by traversing DOM from bottom-up
  for (var i = -1; i < tree.length; i++) {
    var e = i < 0 ? el : tree[i]

    var eCSS = {
      element: e,
      tag: e.tagName.toLowerCase(),
      ids: parseIds(e),
      classes: parseClasses(e)
    }

    css_selector_with_data_attributes = createCssSelectorFromElementUsingSpecialDataAttributes(e);
    if(css_selector_with_data_attributes && css_selector_with_data_attributes!='none') {
      valid_css_selector_with_data_attributes = css_selector_with_data_attributes;
      eCSS.query = valid_css_selector_with_data_attributes;
    }

    else {
      eCSS.query = eCSS.tag + eCSS.ids + eCSS.classes;
    }

    var query = eCSS.query + (selector.length ? ' > ' : '') + selector;

    var matches = $(query);

    l(`QUERY: ${query}`);

    if (matches.length == 1 && matches[0] == el) { // single match (result)

      return query
    } else if (matches.length > 1 && i + 1 < tree.length) { // many matches
      var parentQuery = generateSelector(tree[i + 1])
      var parentMatches = $(parentQuery).children(eCSS.tag)
      var nthQuery = eCSS.tag + ':nth-of-type(' + (parentMatches.index(el) + 1) + ')' + (selector.length ? ' > ' : '') + selector
      var parentNthQuery = parentQuery + ' > ' + nthQuery
      var nthMatches = $(parentNthQuery)

      if (parentMatches.length == 1 && parentMatches[0] == el) { // single match (result)
        return parentQuery + ' > ' + eCSS.tag + (selector.length ? ' > ' : '') + selector
      } else if (nthMatches.length == 1 && nthMatches[0] == el) { // single match with nth-of-type (result)
        return parentNthQuery
      } else {
        l('Unexpected error')
        return null
      }
    } else {
      if (matches.length == 1)
        l("Matched incorrect element. (matches.length = " + matches.length + ")")
      else if (matches.length > 1)
        l("Multiple matches, but traversed entire tree (algorithm not being specific enough).")
      else
        l("Could not find match for tag/id/class selector. (matches.length = " + matches.length + ")")
      return null
    }
  }

  return selector
}
catch(err) {
  the_error = err;
}
}

function parseIds(e) {
  if (e.id.length == 0) return "";
  if (window.do_not_use_id_attribute) {
    return "";
  }
  return '#' + e.id.trim().split(/\s+/).join('#');
}

function parseClasses(e) {
  class_blacklist_new = window.blacklist_classes;
  /*
  if (e.className.length == 0) return ""
  return '.' + e.className.trim().split(/\s+/).filter(e => !FILTER_CLASSES.includes(e)).filter(e => !class_blacklist_new.some(e.includes.bind(e))).join('.')
  */
  return '';
}


/**
 * copySelector - Copies the generated CSS selector to the clipboard
 *
 * @param {Event} e
 */
function copySelector(e) {
  preventListeners(e)
  var copyText = IS_DEV ? `$('${selector}')` : selector
  l(`SELECTOR: ${selector}`)
  l($(selector)[0], true)
  chrome.runtime.sendMessage({
    type: "copy",
    text: copyText
  }, function(response) {
    cleanup()
    fadeAlert(response.message)
  })
}

/**
 * fadeAlert - Displays a popup message at the top of the screen that fades away
 *
 * @param  {String} message
 */
function fadeAlert(message) {
  var now = Date.now()
  $('body').append(`<div class="sf-all" id="sf-alert" class="${now}">${message}</div>`)
  $("#sf-alert").css('left', $(window).outerWidth() / 2 - $("#sf-alert").outerWidth() / 2)
    .css('top', 0)
  window.setTimeout(function() {
    $("#sf-alert").fadeOut(1500, function() {
      $(`#sf-alert.${now}`).remove()
    })
  }, 1000)
}

/**
 * l - Logging with prefixing that's limited to development
 *
 * @param  {String} message
 * @param  {bool} skipPrefix useful for printing objects
 */
function l(message, skipPrefix) {
  if (IS_DEV)
    if (skipPrefix)
      alert(message)
  else
    alert(`Snowflake: ${message}\n`)
}



function createXPathFromElement(the_element) {
  try {
    the_text_inside = '';
    tag_name = the_element.tagName.toLowerCase();
    if(the_element.textContent) {
      the_text_inside = the_element.textContent;
    }
    numberOfLineBreaks = (the_text_inside.match(/\n/g)||[]).length;
    spaceless_text_inside = the_text_inside.replaceAll(" ", "");
    if(numberOfLineBreaks==0 && the_text_inside!='' && the_text_inside!=' ' && spaceless_text_inside!='') {
      the_xpath = '//' + tag_name + '[text() = "'  + the_text_inside +  '"]';
      the_returned_element = document.evaluate(the_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

      if(the_returned_element == the_element) {
        return the_xpath;
      }
      if(!the_returned_element) {
        the_text_inside = the_text_inside.trim();
        the_xpath = '//' + tag_name + '[contains(text(),"'  + the_text_inside +  '")]';
        the_returned_element = document.evaluate(the_xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(the_returned_element == the_element) {
          return the_xpath;
        }
      }

      if(the_returned_element != the_element || !the_returned_element) {
        return "none";
      }
    }
    else {
      return "none";
    }
  }
  catch(err) {
    the_error = err;
    return "none";
  }

}


function createCssSelectorFromElement(the_element) {
  try {
    var nodes = [];
    values = [];
    atts = the_element.attributes;
    n = atts.length;
    tag_name = the_element.tagName;
    css_selector = tag_name.toLowerCase();
    final_css_selector = 'none';
    is_css_selector_unique = false;
    is_css_selector_ok = false;

    var att = '';

    for (i = 0; i < n; i++) {
      att = atts[i];
      attribute_name = att.nodeName;
      attribute_value = att.nodeValue;
      attr_val_has_number = doesStringHaveNumbers(attribute_value);

      stable_attributes = ["href", "action", "src"];
      if (stable_attributes.includes(attribute_name) && attribute_name != '' && attribute_value && attribute_value != '') {
        if (window.do_not_use_url_query_strings && attribute_value.includes("?") && attribute_value.includes("/")) {
          // do nothing
        } else {
          css_selector = css_selector + '[' + attribute_name + '="' + attribute_value + '"]';
          numberOfLineBreaks = (css_selector.match(/\n/g)||[]).length;
          if(numberOfLineBreaks==0) {
            is_css_selector_ok = the_element.matches(css_selector);
          }

          if (is_css_selector_ok) {
            is_css_selector_unique = checkIfLocatorIsUnique("css_selector", css_selector);
            if (is_css_selector_unique) {
              final_css_selector = css_selector;
              break;
            }
          }
        }
      }
      if (!stable_attributes.includes(attribute_name) && attribute_name != '' && attribute_value && attribute_value != '' && !attr_val_has_number) {
        class_blacklist_new = window.blacklist_classes;

        if ((attribute_name == "id" && window.do_not_use_id_attribute) || (attribute_name == "name" && window.do_not_use_name_attribute) || (window.do_not_use_url_query_strings && attribute_value.includes("?") && attribute_value.includes("/")) || (attribute_name == "class" && class_blacklist_new.some(attribute_value.includes.bind(attribute_value)))) {
          // do nothing
        } else {

          css_selector = css_selector + '[' + attribute_name + '="' + attribute_value + '"]';

          numberOfLineBreaks = (css_selector.match(/\n/g)||[]).length;

        if(numberOfLineBreaks==0) {
          is_css_selector_ok = the_element.matches(css_selector);
        }

          if (is_css_selector_ok) {
            is_css_selector_unique = checkIfLocatorIsUnique("css_selector", css_selector);
            if (is_css_selector_unique) {
              final_css_selector = css_selector;
              break;
            }
          }
        }
      }
    }


    if (final_css_selector != 'none') {
      return final_css_selector;
    }
    if (final_css_selector == "none") {

      desperate_css_selector = null;
      try {
        desperate_css_selector = generateSelector(the_element);
      } catch (err) {
        the_error = err;
        // do nothing;
      }
      if (desperate_css_selector != null) {
        return desperate_css_selector;
      }
      if (desperate_css_selector == null) {

        the_parent_of_element = the_element.parentNode;
        if (the_parent_of_element.nodeName == "BUTTON") {
          the_parent = createCssSelectorFromElement(the_parent_of_element);

          if (the_parent != null && the_parent != "none") {
            return the_parent;
          } else {
            return css_selector;
          }
        } else {
          return css_selector;
        }
      }
    }

  } catch (err) {
    the_error = err;
    // do nada;
  }
}




function createCssSelectorFromElementUsingSpecialDataAttributes(the_element) {
  try {
    var nodes = [];
    values = [];
    atts = the_element.attributes;
    n = atts.length;
    tag_name = the_element.tagName;
    css_selector = tag_name.toLowerCase();
    final_css_selector = 'none';
    is_css_selector_unique = false;
    is_css_selector_ok = false;

    var att = '';

    for (i = 0; i < n; i++) {
      att = atts[i];
      attribute_name = att.nodeName;
      attribute_value = att.nodeValue;
      attr_val_has_number = doesStringHaveNumbers(attribute_value);

      the_custom_data_attributes = window.custom_data_attributes;

      if (the_custom_data_attributes.includes(attribute_name) && attribute_name != '' && attribute_value && attribute_value != '') {
        if (window.do_not_use_url_query_strings && attribute_value.includes("?") && attribute_value.includes("/")) {
          // do nothing
        } else {
          css_selector = css_selector + '[' + attribute_name + '="' + attribute_value + '"]';

          is_css_selector_ok = the_element.matches(css_selector);

          if (is_css_selector_ok) {
            is_css_selector_unique = checkIfLocatorIsUnique("css_selector", css_selector);
            if (is_css_selector_unique) {
              final_css_selector = css_selector;
              break;
            }
          }
        }
      }

    }


    if (final_css_selector != 'none') {
      return final_css_selector;
    }
    if (final_css_selector == "none") {
      return final_css_selector;
    }

  } catch (err) {
    // do nada;
    the_error = err;
  }
}

function checkIfLocatorIsUnique(locator_type, locator) {
  try {
    list_of_elems = [];
    switch (locator_type) {
      case "css_selector":
        list_of_elems = document.querySelectorAll(locator);
        if (list_of_elems.length == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case "id":
        list_of_elems = document.querySelectorAll("#" + locator);
        if (list_of_elems.length == 1) {
          return true;
        } else {
          return false;
        }
        break;
      case "name":
        list_of_elems = document.querySelectorAll('[name="' + locator + '"]');
        if (list_of_elems.length == 1) {
          return true;
        } else {
          return false;
        }
        break;
    }

  } catch (err) {
    return false;
  }

}


function doesStringHaveNumbers(item) {
  var regex = /\d/g;
  return regex.test(item);
}

chrome.storage.local.get(['endtest_extension_currently_recording'], function(the_cookie) {
  if (the_cookie.endtest_extension_currently_recording) {
    the_recording_cookie = the_cookie.endtest_extension_currently_recording;
    if (the_recording_cookie == 1) {

      chrome.storage.local.get(['endtest_ignore_classes'], function(ignore_classes) {
        if (ignore_classes.endtest_ignore_classes) {
          classes_to_ignore = ignore_classes.endtest_ignore_classes;
          classes_to_ignore = classes_to_ignore.replace(/\s/g, '');
          if (classes_to_ignore) {
            window.blacklist_classes = classes_to_ignore.split(',');
          }
        } else {
          window.blacklist_classes = ["ng-", "active", "checked", "selected", "focused", "correct", "disable", "enable", "highlight", "over", "hvr", "cursor", "show", "focus", "pressed", "pushed", "touch", "dirty", "pristine", "require", "select", "valid", "open", "hidden", "hide", "desktop", "mobile", "tablet", "grid", "col-", "row-"];
        }


        chrome.storage.local.get(['endtest_custom_data_attributes'], function(custom_data_attributes) {

          if (custom_data_attributes.endtest_custom_data_attributes) {

            custom_data_attributes_to_use = custom_data_attributes.endtest_custom_data_attributes;
            custom_data_attributes_to_use = custom_data_attributes_to_use.replace(/\s/g, '');
            if (custom_data_attributes_to_use) {
              window.custom_data_attributes = custom_data_attributes_to_use.split(',');
            }
          } else {
            window.custom_data_attributes = ["data-test", "data-testing", "data-qa", "data-testid", "data-test-id"];
          }


        chrome.storage.local.get(['endtest_do_not_use_id_attribute'], function(do_not_use_id_attribute) {
          if (do_not_use_id_attribute) {
            to_not_use_id_attribute = do_not_use_id_attribute.endtest_do_not_use_id_attribute;
            if (to_not_use_id_attribute) {
              if (to_not_use_id_attribute == "1") {
                window.do_not_use_id_attribute = true;
              }
              if (to_not_use_id_attribute == "0") {
                window.do_not_use_id_attribute = false;
              }
            }
          } else {
            window.do_not_use_id_attribute = false;
          }

          chrome.storage.local.get(['endtest_do_not_use_name_attribute'], function(do_not_use_name_attribute) {
            if (do_not_use_id_attribute) {
              to_not_use_name_attribute = do_not_use_name_attribute.endtest_do_not_use_name_attribute;
              if (to_not_use_name_attribute) {
                if (to_not_use_name_attribute == "1") {
                  window.do_not_use_name_attribute = true;
                }
                if (to_not_use_name_attribute == "0") {
                  window.do_not_use_name_attribute = false;
                }
              }
            } else {
              window.do_not_use_name_attribute = false;
            }

            chrome.storage.local.get(['endtest_do_not_use_url_query_strings'], function(do_not_use_url_query_strings) {
              if (do_not_use_url_query_strings) {
                to_not_use_url_query_strings = do_not_use_url_query_strings.endtest_do_not_use_url_query_strings;
                if (to_not_use_url_query_strings) {
                  if (to_not_use_url_query_strings == "1") {
                    window.do_not_use_url_query_strings = true;
                  }
                  if (to_not_use_url_query_strings == "0") {
                    window.do_not_use_url_query_strings = false;
                  }
                }
              } else {
                window.do_not_use_url_query_strings = false;
              }

            });

          });

        });




      });

      });



      chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          if (request.message === "clicked_browser_action") {
            var firstHref = $("a[href^='http']").eq(0).attr("href");
            chrome.runtime.sendMessage({
              "message": "open_new_tab",
              "url": firstHref
            });
          }
          if (request.message === "done") {
            if (request.all_the_settings.classes_to_ignore) {
              classes_to_ignore = request.all_the_settings.classes_to_ignore;
              window.blacklist_classes = classes_to_ignore.split(',');
            }
            if (request.all_the_settings.custom_data_attributes_to_use) {
              custom_data_attributes_to_use = request.all_the_settings.custom_data_attributes_to_use;
              window.custom_data_attributes = custom_data_attributes_to_use.split(',');
            }
            if (request.all_the_settings.to_not_use_id_attribute) {
              do_not_use_id_attribute = request.all_the_settings.to_not_use_id_attribute;
              if (do_not_use_id_attribute == "1") {
                window.do_not_use_id_attribute = true;
              }
              if (do_not_use_id_attribute == "0") {
                window.do_not_use_id_attribute = false;
              }
            }
            if (request.all_the_settings.to_not_use_name_attribute) {
              do_not_use_name_attribute = request.all_the_settings.to_not_use_name_attribute;
              if (do_not_use_name_attribute == "1") {
                window.do_not_use_name_attribute = true;
              }
              if (do_not_use_name_attribute == "0") {
                window.do_not_use_name_attribute = false;
              }
            }
            if (request.all_the_settings.to_not_use_url_query_strings) {
              do_not_use_url_query_strings = request.all_the_settings.to_not_use_url_query_strings;
              if (do_not_use_url_query_strings == "1") {
                window.do_not_use_url_query_strings = true;
              }
              if (do_not_use_url_query_strings == "0") {
                window.do_not_use_url_query_strings = false;
              }
            }

          }
        }
      );


      $(document).on('keyup', 'input,textarea', function(e) {
        try {
          try {
            the_type = e.target.type.toLowerCase();
          } catch (err) {
            the_type = "none";
          }
          if (the_type == "checkbox" || the_type == "radio" || the_type == "button" || the_type == "submit" || the_type == "file") {
            return;
          }


          detectIframe(e);

          if (e.keyCode == 13) {

            found_it = 0;
            the_text = e.target.value;

            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }

            if (found_it == 0) {
            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }
              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.name) {
                if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                  locate_by = 'Name';
                  locator = e.target.name;
                  found_it = 1;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_name_attribute) {
                    found_it = 0;
                  }
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  the_label = getLabel(e.target);
                }
              }
            }
          }

            if (found_it == 1) {
              chrome.runtime.sendMessage({
                "message": "write_and_press_enter_key",
                locate_by: locate_by,
                locator: locator,
                text: the_text,
                label: the_label
              });
            }
          }

          if (e.keyCode == 9) {
            found_it = 0;
            the_text = e.target.value;

            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }

            if (found_it == 0) {
            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }
              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.name) {
                if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                  locate_by = 'Name';
                  locator = e.target.name;
                  found_it = 1;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_name_attribute) {
                    found_it = 0;
                  }
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  the_label = getLabel(e.target);
                }
              }
            }
          }
            if (found_it == 1) {
              chrome.runtime.sendMessage({
                "message": "write_and_press_tab_key",
                locate_by: locate_by,
                locator: locator,
                text: the_text,
                label: the_label
              });
            }
          }
        } catch (err) {
          // do nothing;
        }

      });

      $(document).on('keyup', '*', function(e) {
        try {

          detectIframe(e);

          if (e.keyCode == 27) {

            found_it = 0;

            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }

            if (found_it == 0) {

            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }
              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.name) {
                if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                  locate_by = 'Name';
                  locator = e.target.name;
                  found_it = 1;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_name_attribute) {
                    found_it = 0;
                  }
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  the_label = getLabel(e.target);
                }
              }
            }
          }

            if (found_it == 1 && e.keyCode == 27) {
              chrome.runtime.sendMessage({
                "message": "press_esc_key",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }


          }

          if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39) {
            found_it = 0;
            e.stopPropagation();

            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }

            if (found_it == 0) {
            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }
              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.name) {
                if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                  locate_by = 'Name';
                  locator = e.target.name;
                  found_it = 1;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_name_attribute) {
                    found_it = 0;
                  }
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  the_label = getLabel(e.target);
                }
              }
            }
          }

            if (found_it == 1 && e.keyCode == 40) {
              chrome.runtime.sendMessage({
                "message": "press_down_arrow_key",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }
            if (found_it == 1 && e.keyCode == 38) {
              chrome.runtime.sendMessage({
                "message": "press_up_arrow_key",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }
            if (found_it == 1 && e.keyCode == 13) {
              chrome.runtime.sendMessage({
                "message": "press_enter_key",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }
            if (found_it == 1 && e.keyCode == 37) {
              chrome.runtime.sendMessage({
                "message": "press_left_arrow_key",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }
            if (found_it == 1 && e.keyCode == 39) {
              chrome.runtime.sendMessage({
                "message": "press_right_arrow_key",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }


          }


        } catch (err) {
          // do nothing;
        }

      });

      $(document).on('blur', 'input,textarea', function(e) {
        try {


          the_type = "none";
          try {
            if (e.target.tagName != "TEXTAREA") {
              the_type = e.target.getAttribute("type").toLowerCase();
            }
          }
          catch(err) {
            the_error = err;
          }
          if (e.target.tagName == "TEXTAREA") {
            the_type = "none";
          }

          if (the_type == "checkbox" || the_type == "radio" || the_type == "button" || the_type == "submit" || the_type == "file") {
            return;
          }

          detectIframe(e);
          found_it = 0;
          the_text = e.target.value;

          if (window.custom_data_attributes) {
            css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
            if (css_selector != 'none') {
              locate_by = 'CSS Selector';
              locator = css_selector;
              found_it = 1;
              the_label = getLabel(e.target);
            }
          }

          if (found_it == 0) {
          if (e.target.id) {

            the_id = e.target.id;
            if(the_id.includes(".")) {
              the_id = the_id.replaceAll(".", "\\.");
            }
            if(the_id.includes("/")) {
              the_id = the_id.replaceAll("/", "\\/");
            }

            if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
              locate_by = 'Id';
              locator = e.target.id;
              found_it = 1;
              the_label = getLabel(e.target);
              if (window.do_not_use_id_attribute) {
                found_it = 0;
              }

            }
          }
          if (found_it == 0) {
            if (e.target.name) {
              if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                locate_by = 'Name';
                locator = e.target.name;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_name_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              css_selector = createCssSelectorFromElement(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }
          }
        }

          if (found_it == 1) {
            chrome.runtime.sendMessage({
              "message": "write_text_event",
              locate_by: locate_by,
              locator: locator,
              text: the_text,
              label: the_label
            });
          }
        } catch (err) {
          the_error = err;
          // do nothing;
        }
      });


      var previous = 0;


      $.fn.scrollEnd = function(callback, timeout) {
        try {

          $(this).scroll(function() {
            var $this = $(this);
            if ($this.data('scrollTimeout')) {
              clearTimeout($this.data('scrollTimeout'));
            }
            $this.data('scrollTimeout', setTimeout(callback, timeout));
          });
        } catch (err) {
          // do nothing again;
        }
      };

      window.previous = 0;

      $(window).scrollEnd(function() {

        try {

          var current = $(this).scrollTop();
          if (current > window.previous) {
            distance = current - window.previous;
            chrome.runtime.sendMessage({
              "message": "scroll_event",
              scrollType: 'Scroll Down',
              scrollDistance: parseInt(distance)
            });
          } else {
            distance = window.previous - current;
            chrome.runtime.sendMessage({
              "message": "scroll_event",
              scrollType: 'Scroll Up',
              scrollDistance: parseInt(distance)
            });
          }
          window.previous = current;
        } catch (err) {
          // do nothing of course
        }

      }, 500);


      function detectIframe(e) {
        try {
          found_it = 0;
          if ( window.location !== window.parent.location ) {
              if(window.id && !window.do_not_use_id_attribute) {
                the_label = "";
                chrome.runtime.sendMessage({
                  "message": "switch_to_iframe_event",
                  locate_by: 'Id',
                  locator: window.id,
                  label: the_label
                });
                found_it = 1;
              }
              if(found_it == 0) {
              if(window.name && !window.do_not_use_name_attribute) {
                the_label = "";
                chrome.runtime.sendMessage({
                  "message": "switch_to_iframe_event",
                  locate_by: 'Name',
                  locator: window.name,
                  label: the_label
                });
                found_it = 1;
              }
              }

              if(found_it == 0) {
                css_selector_of_iframe = "iframe";
                the_label = "";
                chrome.runtime.sendMessage({
                  "message": "switch_to_iframe_event",
                  locate_by: 'CSS Selector',
                  locator: css_selector_of_iframe,
                  label: the_label
                });
            }

            }
            else {
              chrome.runtime.sendMessage({
                "message": "switch_to_main_event"
              });
            }


            /*
          if (window.top != window.self) {
            if (window.self.frameElement.id && !window.do_not_use_id_attribute) {
              the_label = getLabel(e.target);
              chrome.runtime.sendMessage({
                "message": "switch_to_iframe_event",
                locate_by: 'Id',
                locator: window.self.frameElement.id,
                label: the_label
              });
            }
            if (!window.self.frameElement.id || window.do_not_use_id_attribute) {
              if (window.self.frameElement.name) {
                the_label = getLabel(e.target);
                chrome.runtime.sendMessage({
                  "message": "switch_to_iframe_event",
                  locate_by: 'Name',
                  locator: window.self.frameElement.name,
                  label: the_label
                });
              }


              if (!window.self.frameElement.name || !window.do_not_use_name_attribute) {

                css_selector_of_iframe = "iframe";
                the_label = getLabel(e.target);
                chrome.runtime.sendMessage({
                  "message": "switch_to_iframe_event",
                  locate_by: 'CSS Selector',
                  locator: css_selector_of_iframe,
                  label: the_label
                });
              }
            }


          } else {
            chrome.runtime.sendMessage({
              "message": "switch_to_main_event"
            });
          }

          */

        } catch (err) {
          the_error = err;
          // do nothing;
        }
      }

      function wait(ms) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + ms) {
          end = new Date().getTime();
        }
      }

      window.onload = function(e) {
        try {
          window.setTimeout(function() {
            $('input:-webkit-autofill').each(function() {
              $(this).val("");
            });
            $('input').each(function() {
              try {
                if(e.target.type) {
                  the_type = e.target.type.toLowerCase();
                }
                else {
                  the_type = "none";
                }
              } catch (err) {
                the_error = err;
                the_type = "none";
              }
              if (the_type != "button" && the_type != "submit" && the_type != "none" && the_type != "hidden" && the_type != "none") {
                $(this).val("");
              }
            });
          }, 500)

        } catch (err) {
          the_error = err;
          // dp nothing
        }
      };


      var tagsToReplace = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};

  function replaceTag(tag) {
      return tagsToReplace[tag] || tag;
  }

  function safe_tags_replace(str) {
    return str.replace(/[&<>]/g, replaceTag);
  }


      function getLabel(the_element) {
        try {
          var nodes = [];
          values = [];
          atts = the_element.attributes;
          n = atts.length;
          tag_name = the_element.tagName.toLowerCase();
          var att = '';

          good_attributes = ["placeholder", "id", "name", "value", "title"];
          max_length_for_label = 15

          the_text_inside = the_element.textContent;
          the_text_inside = the_text_inside.trim();
          the_text_inside = the_text_inside.replaceAll("<", "");
          the_text_inside = the_text_inside.replaceAll(">", "");
          if (the_text_inside.length < max_length_for_label && the_text_inside.length > 2) {
            the_text_inside = the_text_inside.replace(/(\r\n|\n|\r)/gm, "");
            return the_text_inside;
          }
          if (the_text_inside.length >= max_length_for_label) {
            the_text_inside_truncated = the_text_inside.substring(0, max_length_for_label);
            the_text_inside_truncated_dots = the_text_inside_truncated + "...";
            the_text_inside_truncated_dots = the_text_inside_truncated_dots.replace(/(\r\n|\n|\r)/gm, "");
            return the_text_inside_truncated_dots;
          }

          for (i = 0; i < n; i++) {
            att = atts[i];
            attribute_name = att.nodeName;
            attribute_value = att.nodeValue;

            if (good_attributes.includes(attribute_name) && attribute_name != '' && attribute_value && attribute_value != '') {
              if (attribute_value.length < max_length_for_label) {
                attribute_value = attribute_value.replace(/(\r\n|\n|\r)/gm, "");
                return attribute_value;
                break;
              }
              if (attribute_value.length >= max_length_for_label) {
                attribute_value_truncated = attribute_value.substring(0, max_length_for_label);
                attribute_value_truncated_dots = attribute_value_truncated + "...";
                attribute_value_truncated_dots = attribute_value_truncated_dots.replace(/(\r\n|\n|\r)/gm, "");
                return attribute_value_truncated_dots;
                break;
              }
            }
          }

          if (the_text_inside.length <= 2) {
            tag_name = tag_name.replace(/(\r\n|\n|\r)/gm, "");
            return tag_name;
          }
        } catch (err) {
          the_error = err;
          // do nothing;
          return "none"
        }
      }


      window.onmouseup = function(e) {
        try {
          detectIframe(e);
          the_link_text = '';
          the_text_inside = '';
          found_it = 0;
          the_label = "none";

          if (e.target.tagName == "INPUT") {
            try {
              the_type = e.target.type.toLowerCase();
            } catch (err) {
              the_error = err;
              the_type = "none";
            }
            if (the_type == "file") {
              return;
            }
          }
          if (e.target.tagName == "svg" && e.target.parentNode != null) {
            try {
              if (e.target.parentNode.tagName != 'SELECT' && e.target.parentNode.tagName != 'OPTION') {

                if (window.custom_data_attributes) {
                  css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target.parentNode);
                  if (css_selector != 'none') {
                    locate_by = 'CSS Selector';
                    locator = css_selector;
                    found_it = 1;
                    the_label = getLabel(e.target.parentNode);
                  }
                }

                if (found_it == 0) {
                if (e.target.parentNode.id) {
                  if (e.target.parentNode.matches("#" + e.target.parentNode.id) && checkIfLocatorIsUnique("id", e.target.parentNode.id)) {
                    locate_by = 'Id';
                    locator = e.target.parentNode.id;
                    found_it = 1;
                    the_label = getLabel(e.target.parentNode);
                    if (window.do_not_use_id_attribute) {
                      found_it = 0;
                    }
                  }
                }
                if (found_it == 0) {
                  if (e.target.parentNode.name) {
                    if (e.target.parentNode.matches('[name="' + e.target.parentNode.name + '"]') && checkIfLocatorIsUnique("name", e.target.parentNode.name)) {
                      locate_by = 'Name';
                      locator = e.target.parentNode.name;
                      found_it = 1;
                      the_label = getLabel(e.target.parentNode);
                      if (window.do_not_use_name_attribute) {
                        found_it = 0;
                      }
                    }
                  }
                  if (found_it == 0) {
                    xpath = createXPathFromElement(e.target);
                    if (xpath != 'none') {
                      if (xpath != "null" && xpath != 'none') {
                        locate_by = 'XPath';
                        locator = xpath;
                        found_it = 1;
                        the_label = getLabel(e.target);
                      }
                    }
                  }
                  if (found_it == 0) {
                    css_selector = createCssSelectorFromElement(e.target.parentNode);
                    if (css_selector != 'none') {
                      locate_by = 'CSS Selector';
                      locator = css_selector;
                      found_it = 1;
                      the_label = getLabel(e.target.parentNode);
                    }
                  }
                }
                }
                if (found_it == 1) {
                  chrome.storage.local.get(['endtest_extension_currently_recording'], function(the_cookie) {
                    if (the_cookie.endtest_extension_currently_recording) {
                      the_recording_cookie = the_cookie.endtest_extension_currently_recording;
                      if (the_recording_cookie == "4") {
                        chrome.runtime.sendMessage({
                          "message": "add_assertion",
                          locate_by: locate_by,
                          locator: locator,
                          label: the_label
                        });
                        e.stopImmediatePropagation();
                      }
                      if (the_recording_cookie != "4") {
                        chrome.runtime.sendMessage({
                          "message": "click_event",
                          locate_by: locate_by,
                          locator: locator,
                          label: the_label
                        });
                      }
                    }
                  });
                }
              }
            } catch (err) {
              the_error = err;
            }
          }
          if (e.target.tagName != 'SELECT' && e.target.tagName != 'OPTION') {
            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }
            if (found_it == 0) {
            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }
              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.name) {
                if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                  locate_by = 'Name';
                  locator = e.target.name;
                  found_it = 1;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_name_attribute) {
                    found_it = 0;
                  }
                }
              }
              if (found_it == 0) {
                xpath = createXPathFromElement(e.target);
                if (xpath != 'none') {
                  if (xpath != "null" && xpath != 'none') {
                    locate_by = 'XPath';
                    locator = xpath;
                    found_it = 1;
                    the_label = getLabel(e.target);
                  }
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  if (css_selector != "null" && css_selector != 'none') {
                    locate_by = 'CSS Selector';
                    locator = css_selector;
                    found_it = 1;
                    the_label = getLabel(e.target);
                  }
                }
              }
            }
          }
            if (found_it == 1) {
              chrome.storage.local.get(['endtest_extension_currently_recording'], function(the_cookie) {
                if (the_cookie.endtest_extension_currently_recording) {
                  the_recording_cookie = the_cookie.endtest_extension_currently_recording;
                  if (the_recording_cookie == "4") {
                    chrome.runtime.sendMessage({
                      "message": "add_assertion",
                      locate_by: locate_by,
                      locator: locator,
                      label: the_label
                    });
                    e.stopImmediatePropagation();
                  }
                  if (the_recording_cookie != "4") {
                    chrome.runtime.sendMessage({
                      "message": "click_event",
                      locate_by: locate_by,
                      locator: locator,
                      label: the_label
                    });
                  }
                }
              });




            }
          }

        } catch (err) {
          the_error = err;
          // do nothing about it
        }
      };




      window.onmousemove = function(e) {
        try {

          if (typeof window.start_date !== "undefined") {
            window.old_pointer_x = pointer_x;
            window.old_pointer_y = pointer_y;
            window.old_elemennt_hovered = element_hovered;
            window.old_start_date = start_date;
          }

          window.pointer_x = e.clientX;
          window.pointer_y = e.clientY;
          window.element_hovered = document.elementFromPoint(pointer_x, pointer_y);
          window.start_date = new Date();


          if (typeof window.start_date !== "undefined" && typeof window.old_start_date !== "undefined") {
            window.time_diff = (window.start_date.getTime() - window.old_start_date.getTime()) / 1000;
          }
          if (typeof window.start_date === "undefined") {
            window.time_diff = 1;
          }


          e.stopPropagation();

          if (window.old_elemennt_hovered !== "undefined" && window.element_hovered !== "undefined" && window.old_elemennt_hovered == window.element_hovered) {
            try {
              if (window.time_diff !== "undefined") {

                if (window.time_diff < 1) {
                  nothing = "nada";
                  e.stopPropagation();
                }
                if (window.time_diff > 1) {
                  e.stopPropagation();
                  detectIframe(e);
                  the_link_text = '';
                  the_text_inside = '';
                  found_it = 0;
                  the_label = "none";


                  if (window.custom_data_attributes) {
                    css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
                    if (css_selector != 'none') {
                      locate_by = 'CSS Selector';
                      locator = css_selector;
                      found_it = 1;
                      the_label = getLabel(e.target);
                    }
                  }

                if (found_it == 0) {
                  if (e.target.id) {
                    the_id = e.target.id;
                    if(the_id.includes(".")) {
                      the_id = the_id.replaceAll(".", "\\.");
                    }
                    if(the_id.includes("/")) {
                      the_id = the_id.replaceAll("/", "\\/");
                    }
                    if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                      locate_by = 'Id';
                      locator = e.target.id;
                      found_it = 1;
                      the_label = getLabel(e.target);
                      if (window.do_not_use_id_attribute) {
                        found_it = 0;
                      }
                    }
                  }
                  if (found_it == 0) {
                    if (e.target.name) {
                      if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                        locate_by = 'Name';
                        locator = e.target.name;
                        found_it = 1;
                        the_label = getLabel(e.target);
                        if (window.do_not_use_name_attribute) {
                          found_it = 0;
                        }
                      }
                    }
                    if (found_it == 0) {
                      css_selector = createCssSelectorFromElement(e.target);
                      if (css_selector != 'none') {
                        locate_by = 'CSS Selector';
                        locator = css_selector;
                        found_it = 1;
                        the_label = getLabel(e.target);
                      }
                    }
                  }
                }
                  if (found_it == 1) {
                    chrome.runtime.sendMessage({
                      "message": "hover_event",
                      locate_by: locate_by,
                      locator: locator,
                      label: the_label
                    });
                  }

                }

              }
            } catch (err) {
              the_error = err;
              // do nothing about it
            }
          }
        } catch (err) {
          // do nothing about it
          the_error = err;
        }
      };


      window.onchange = function(e) {
        try {
          detectIframe(e);
          if (e.target.tagName == "INPUT") {
            try {
              the_type = e.target.type.toLowerCase();
            } catch (err) {
              the_error = err;
              the_type = "none";
            }
            if (the_type == "file") {
              found_it = 0;

              if (window.custom_data_attributes) {
                css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  the_label = getLabel(e.target);
                }
              }

              if (found_it == 0) {
              if (e.target.id) {
                the_id = e.target.id;
                if(the_id.includes(".")) {
                  the_id = the_id.replaceAll(".", "\\.");
                }
                if(the_id.includes("/")) {
                  the_id = the_id.replaceAll("/", "\\/");
                }
                if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                  locate_by = 'Id';
                  locator = e.target.id;
                  found_it = 1;
                  file_to_pick = document.getElementById(locator).value;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_id_attribute) {
                    found_it = 0;
                  }
                }
              }
              if (found_it == 0) {
                if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                  locate_by = 'Name';
                  locator = e.target.name;
                  found_it = 1;
                  file_to_pick = document.querySelector('[name="' + locator + '"]').value;
                  the_label = getLabel(e.target);
                  if (window.do_not_use_name_attribute) {
                    found_it = 0;
                  }
                }
                if (found_it == 0) {
                  css_selector = createCssSelectorFromElement(e.target);
                  if (css_selector != 'none') {
                    locate_by = 'CSS Selector';
                    locator = css_selector;
                    found_it = 1;
                    file_to_pick = document.querySelector(locator).value;
                    the_label = getLabel(e.target);
                  }
                }
              }
            }
              if (found_it == 1) {
                chrome.runtime.sendMessage({
                  "message": "upload_file_event",
                  locate_by: locate_by,
                  locator: locator,
                  file_to_pick: file_to_pick,
                  label: the_label
                });
              }
            }

          }
          if (e.target.tagName == 'SELECT') {
            found_it = 0;

            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }

            if (found_it == 0) {
            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }

              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                option_to_pick = document.getElementById(locator).value;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                locate_by = 'Name';
                locator = e.target.name;
                found_it = 1;
                option_to_pick = document.querySelector('[name="' + locator + '"]').value;
                the_label = getLabel(e.target);
                if (window.do_not_use_name_attribute) {
                  found_it = 0;
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  option_to_pick = document.querySelector(locator).value;
                  the_label = getLabel(e.target);
                }
              }
            }
          }
            if (found_it == 1) {
              chrome.runtime.sendMessage({
                "message": "select_option_event",
                locate_by: locate_by,
                locator: locator,
                option_to_pick: option_to_pick,
                label: the_label
              });
            }
          }

        } catch (err) {
          the_error = err;
        }
      };


      window.oncontextmenu = function(e) {

        try {
          detectIframe(e);
          the_link_text = '';
          the_text_inside = '';
          found_it = 0;
          if (e.target.tagName != 'SELECT' && e.target.tagName != 'OPTION') {

            if (window.custom_data_attributes) {
              css_selector = createCssSelectorFromElementUsingSpecialDataAttributes(e.target);
              if (css_selector != 'none') {
                locate_by = 'CSS Selector';
                locator = css_selector;
                found_it = 1;
                the_label = getLabel(e.target);
              }
            }


            if (found_it == 0) {
            if (e.target.id) {
              the_id = e.target.id;
              if(the_id.includes(".")) {
                the_id = the_id.replaceAll(".", "\\.");
              }
              if(the_id.includes("/")) {
                the_id = the_id.replaceAll("/", "\\/");
              }
              if (e.target.matches("#" + the_id) && checkIfLocatorIsUnique("id", the_id)) {
                locate_by = 'Id';
                locator = e.target.id;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_id_attribute) {
                  found_it = 0;
                }
              }
            }
            if (found_it == 0) {
              if (e.target.matches('[name="' + e.target.name + '"]') && checkIfLocatorIsUnique("name", e.target.name)) {
                locate_by = 'Name';
                locator = e.target.name;
                found_it = 1;
                the_label = getLabel(e.target);
                if (window.do_not_use_name_attribute) {
                  found_it = 0;
                }
              }
              if (found_it == 0) {
                xpath = createXPathFromElement(e.target);
                if (xpath != 'none') {
                  if (xpath != "null" && xpath != 'none') {
                    locate_by = 'XPath';
                    locator = xpath;
                    found_it = 1;
                    the_label = getLabel(e.target);
                  }
                }
              }
              if (found_it == 0) {
                css_selector = createCssSelectorFromElement(e.target);
                if (css_selector != 'none') {
                  locate_by = 'CSS Selector';
                  locator = css_selector;
                  found_it = 1;
                  the_label = getLabel(e.target);
                }
              }
            }
          }
            if (found_it == 1) {
              chrome.runtime.sendMessage({
                "message": "right_click_event",
                locate_by: locate_by,
                locator: locator,
                label: the_label
              });
            }

          }

        } catch (err) {
          the_error = err;
          // do nothing
        }
      };



    }
  }
});
