const DEFAULT_CHART_HEIGHT = '500px'

const DEFAULT_TITLE_STYLE = {
  color: '#737373',
  fontSize: '16px',
  fontWeight: 'regular'
}

const BASE_LINE_CHART = {
  chart: {
    type: 'line',
    height: DEFAULT_CHART_HEIGHT
  }
}

const BASE_LEGEND = {
  layout: 'horizontal',
  align: 'center',
  verticalAlign: 'bottom'
}

const BASE_X_AXIS = {
  title: null as unknown as { text?: string | null },
  labels: { rotation: -45 }
}

const TOOLTIP_SHARED_CROSSHAIRS = {
  shared: true,
  crosshairs: true
}

export default {
  BASE_LINE_CHART,
  BASE_LEGEND,
  BASE_X_AXIS,
  DEFAULT_TITLE_STYLE,
  TOOLTIP_SHARED_CROSSHAIRS
}