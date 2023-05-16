import { reactive, readonly } from "vue";

const state = reactive({
  currentDate: new Date(),
  activeViews: [],
  unitSelected: "km",
  themeSelected: "light",
  upcomingEvent: null,
  highlightedEvent: null,
  showOtherEvents: false,
});

const getters = {
  currentDate: () => state.currentDate,
  activeViews: () => state.activeViews,
  unitSelected: () => state.unitSelected,
  themeSelected: () => state.themeSelected,
  upcomingEvent: () => state.upcomingEvent,
  highlightedEvent: () => state.highlightedEvent,
  showOtherEvents: () => state.showOtherEvents,
};

const mutations = {
  addActiveView(view) {
    if (!methods.isActiveView(view)) {
      state.activeViews.push(view);
    }
  },
  removeActiveView(view) {
    const idx = state.activeViews.indexOf(view);
    if (methods.isActiveView(view)) {
      state.activeViews.splice(idx, 1);
    }
  },
  setUnitSelected(unit) {
    state.unitSelected = unit;
  },
  setThemeSelected(theme) {
    state.themeSelected = theme;
  },
  setUpcomingEvent(event) {
    state.upcomingEvent = event;
  },
  setHighlightEvent(event) {
    state.highlightedEvent = event;
  },
  toggleShowOtherEvents() {
    state.showOtherEvents = !state.showOtherEvents;
  },
};

const methods = {
  isActiveView(view) {
    return state.activeViews.includes(view);
  },
  activeViewsExist() {
    return state.activeViews.length > 0;
  },
  sortViewsByPriority() {
    if (state.activeViews.length > 1) {
      state.activeViews.sort((a, b) => {
        return a.priority - b.priority;
      });
    }
  },
  closeMostActiveView() {
    if (this.activeViewsExist()) {
      this.sortViewsByPriority();
      mutations.removeActiveView(state.activeViews[0]);
    }
  },
  initTheme() {
    this.changeTheme(getters.themeSelected());
  },
  changeTheme(theme) {
    document.body.classList.remove(state.themeSelected);
    mutations.setThemeSelected(theme);
    document.body.classList.add(theme);
  },
};

export default {
  state: readonly(state),
  getters,
  mutations,
  methods,
};
