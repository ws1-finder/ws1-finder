// This Class based on code from https://github.com/babyman/quick-tabs-chrome-extension, license below

// BSD 3-Clause License

// Copyright (c) 2009 - 2018, Evan Jehu
// All rights reserved.

// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:

// * Redistributions of source code must retain the above copyright notice, this
// list of conditions and the following disclaimer.

// * Redistributions in binary form must reproduce the above copyright notice,
// this list of conditions and the following disclaimer in the documentation
// and/or other materials provided with the distribution.

// * Neither the name of the copyright holder nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.

// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
// FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
// DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
// SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
// OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
import { launchURLAndClose } from "./services/url";
export default class KeyboardBehaviors {
  constructor (jQuery) {
    this.jQuery = jQuery;

    this.entryWithFocus = this.entryWithFocus.bind(this);
    this.isFocusSet = this.isFocusSet.bind(this);
    this.focus = this.focus.bind(this);
    this.focusFirst = this.focusFirst.bind(this);
    this.focusLast = this.focusLast.bind(this);
    this.focusPrev = this.focusPrev.bind(this);
    this.focusNext = this.focusNext.bind(this);
    this.scrollToFocus = this.scrollToFocus.bind(this);
    this.bindBehaviors = this.bindBehaviors.bind(this);
  }

  entryWithFocus() {
    return this.jQuery(".withfocus");
  }

  isFocusSet() {
    return this.entryWithFocus().length > 0;
  }

  focus(elem) {
    this.entryWithFocus().removeClass('withfocus');
    elem.addClass('withfocus');
    this.scrollToFocus();
  }

  focusFirst() {
    this.focus(this.jQuery(".item:visible:first"));
  }

  focusLast() {
    this.focus(this.jQuery(".item:visible:last"))
  }

  focusPrev(skip) {
    skip = skip || 1;
    this.entryWithFocus().removeClass('withfocus').prevAll(".item:visible").eq(skip - 1).addClass('withfocus');
    if (!this.isFocusSet()) {
      (skip === 1 ? this.focusLast : this.focusFirst)();
    }

    this.scrollToFocus();
  }

  focusNext(skip) {
    skip = skip || 1;
    this.entryWithFocus().removeClass('withfocus').nextAll(".item:visible").eq(skip - 1).addClass('withfocus');
    if (!this.isFocusSet()) {
      (skip === 1 ? this.focusFirst : this.focusLast)();
    }

    this.scrollToFocus();
  }


  scrollToFocus() {
    const element = this.entryWithFocus();

    // make sure we have an element to scroll to
    if (element.length > 0) {
      const offset = element.offset().top;
      const elementHeight = element.outerHeight(true) * 2;

      const visible_area_start = this.jQuery(window).scrollTop();
      const visible_area_end = visible_area_start + window.innerHeight;

      if (offset < visible_area_start + elementHeight) {
        // scrolling up
        window.scroll({top: offset - elementHeight, left: 0, behavior: 'smooth'});
      } else if (offset > visible_area_end - elementHeight) {
        // scrolling down
        window.scroll({top: offset - window.innerHeight + elementHeight, left: 0, behavior: 'smooth'});
      }
    }
  }

  bindBehaviors(document) {
    let keyboardBehaviors = this;
    document.on('keydown.down',  function() {
      keyboardBehaviors.focusNext();
      return false;
    });

    document.on('keydown.up', function() {
      keyboardBehaviors.focusPrev();
      return false;
    });

    document.on('keydown.tab', function() {
      keyboardBehaviors.focusNext();
      return false;
    });

    document.on('keydown.shift_tab', function() {
      keyboardBehaviors.focusPrev();
      return false;
    });

    document.on('keydown.return', function() {
      if (!keyboardBehaviors.isFocusSet()) {
        keyboardBehaviors.focusFirst();
      }

      if (keyboardBehaviors.isFocusSet()) {
        launchURLAndClose(keyboardBehaviors.jQuery(keyboardBehaviors.entryWithFocus().find("a")[0]).attr('href'));
      }
    });

    document.on('keydown.home', function(e) {
      keyboardBehaviors.focusFirst();
      return false;
    });

    document.on('keydown.end', function(e) {
      keyboardBehaviors.focusLast();
      return false;
    });
  }
}
