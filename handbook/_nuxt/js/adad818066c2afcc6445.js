(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{307:function(e,n,t){"use strict";t.r(n),n.default="# Apache ECharts 5.3.0 Features\n\nApache ECharts 5.3.0 includes significant enhancements to animation expressiveness, rendering performance, and server-side rendering. It also adds long-awaited features from the community, such as automatic alignment of multi-axis ticks, tooltip value formatting, and map projection.\n\n## Keyframe Animations\n\nPreviously, ECharts animations were focused on transition animations for creating, updating, and removing elements, which often only had a start state and an end state. In order to express more complex animations, we introduced new keyframe animations for custom series and graphics components in 5.3.0.\n\nHere is a simple effect of a breathing animation implemented via keyframe animation\n\n```js live {layout: 'lr', height:300}\noption = {\n  graphic: {\n    type: 'circle',\n    shape: { r: 100 },\n    left: 'center',\n    top: 'center',\n    keyframeAnimation: [\n      {\n        duration: 3000,\n        loop: true,\n        keyframes: [\n          {\n            percent: 0.5,\n            easing: 'sinusoidalInOut',\n            scaleX: 0.1,\n            scaleY: 0.1\n          },\n          {\n            percent: 1,\n            easing: 'sinusoidalInOut',\n            scaleX: 1,\n            scaleY: 1\n          }\n        ]\n      }\n    ]\n  }\n};\n```\n\nIn keyframe animation you can configure the animation duration, delay, easing, whether to loop or not, the position, easing, and graphic properties of each keyframe. You can also set multiple keyframe animations for each element at the same time with different configurations. The flexible configuration allows us to achieve very complex animation effects, and here are a few scenarios where keyframe animation can be applied.\n\n### Custom Loading Animations\n\nECharts has a built-in loading animation by default, which can be displayed by calling `showLoading`. More loading animation effects have been frequently asked in the community. Now with keyframe animations, we can use the [graphic](${optionPath}graphic) component with keyframe animations to achieve any loading animation effect we want.\n\nHere is an example of the text stroke animation.\n\n```js live {layout: 'lr', height:300}\noption = {\n  graphic: {\n    elements: [\n      {\n        type: 'text',\n        left: 'center',\n        top: 'center',\n        style: {\n          text: 'Apache ECharts',\n          fontSize: 40,\n          fontWeight: 'bold',\n          lineDash: [0, 200],\n          lineDashOffset: 0,\n          fill: 'transparent',\n          stroke: '#000',\n          lineWidth: 1\n        },\n        keyframeAnimation: {\n          duration: 3000,\n          loop: true,\n          keyframes: [\n            {\n              percent: 0.7,\n              style: {\n                fill: 'transparent',\n                lineDashOffset: 200,\n                lineDash: [200, 0]\n              }\n            },\n            {\n              // Stop for a while.\n              percent: 0.8,\n              style: {\n                fill: 'transparent'\n              }\n            },\n            {\n              percent: 1,\n              style: {\n                fill: 'black'\n              }\n            }\n          ]\n        }\n      }\n    ]\n  }\n};\n```\n\nOr animate columns.\n\n```js live {layout: 'lr', height:300}\nconst columns = [];\nfor (let i = 0; i < 7; i++) {\n  columns.push({\n    type: 'rect',\n    x: i * 20,\n    shape: {\n      x: 0,\n      y: -40,\n      width: 10,\n      height: 80\n    },\n    style: {\n      fill: '#5470c6'\n    },\n    keyframeAnimation: {\n      duration: 1000,\n      delay: i * 200,\n      loop: true,\n      keyframes: [\n        {\n          percent: 0.5,\n          scaleY: 0.1,\n          easing: 'cubicIn'\n        },\n        {\n          percent: 1,\n          scaleY: 1,\n          easing: 'cubicOut'\n        }\n      ]\n    }\n  });\n}\noption = {\n  graphic: {\n    elements: [\n      {\n        type: 'group',\n        left: 'center',\n        top: 'center',\n        children: columns\n      }\n    ]\n  }\n};\n```\n\n### Extending Richer Animation Effects in the Chart\n\nScatter charts with animation effects have long been a feature of ECharts. Developers can use the [effectScatter](${optionPath}series-effectScatter) series to implement dynamic scatter charts with ripple effects, which make charts more interesting and also serve to highlight the user. As with loading animations, developers often ask for more animation effects. Now we can achieve more complex effects by using keyframe animations in our [custom](${optionPath}series-custom) series.\n\nFor example, the following example animates the pins drawn by the custom series on the SVG map with a jumping effect, along with a ripple animation.\n\n\x3c!-- <md-example src=\"geo-svg-custom-effect\" width=\"100%\" height=\"500\" /> --\x3e\n\n```js live {layout: 'lr', readOnly: true }\nfetch(\n  'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/Map_of_Iceland.svg'\n)\n  .then(response => response.text())\n  .then(svg => {\n    echarts.registerMap('iceland_svg', { svg: svg });\n    option = {\n      geo: {\n        map: 'iceland_svg',\n        left: 0,\n        right: 0\n      },\n      series: {\n        type: 'custom',\n        coordinateSystem: 'geo',\n        geoIndex: 0,\n        zlevel: 1,\n        data: [\n          [488, 459, 100],\n          [770, 757, 30],\n          [1180, 743, 80],\n          [894, 1188, 61],\n          [1372, 477, 70],\n          [1378, 935, 81]\n        ],\n        renderItem(params, api) {\n          const coord = api.coord([\n            api.value(0, params.dataIndex),\n            api.value(1, params.dataIndex)\n          ]);\n\n          const circles = [];\n          for (let i = 0; i < 5; i++) {\n            circles.push({\n              type: 'circle',\n              shape: {\n                cx: 0,\n                cy: 0,\n                r: 30\n              },\n              style: {\n                stroke: 'red',\n                fill: 'none',\n                lineWidth: 2\n              },\n              // Ripple animation\n              keyframeAnimation: {\n                duration: 4000,\n                loop: true,\n                delay: (-i / 4) * 4000,\n                keyframes: [\n                  {\n                    percent: 0,\n                    scaleX: 0,\n                    scaleY: 0,\n                    style: {\n                      opacity: 1\n                    }\n                  },\n                  {\n                    percent: 1,\n                    scaleX: 1,\n                    scaleY: 0.4,\n                    style: {\n                      opacity: 0\n                    }\n                  }\n                ]\n              }\n            });\n          }\n          return {\n            type: 'group',\n            x: coord[0],\n            y: coord[1],\n            children: [\n              ...circles,\n              {\n                type: 'path',\n                shape: {\n                  d:\n                    'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',\n                  x: -10,\n                  y: -35,\n                  width: 20,\n                  height: 40\n                },\n                style: {\n                  fill: 'red'\n                },\n                // Jump animation.\n                keyframeAnimation: {\n                  duration: 1000,\n                  loop: true,\n                  delay: Math.random() * 1000,\n                  keyframes: [\n                    {\n                      y: -10,\n                      percent: 0.5,\n                      easing: 'cubicOut'\n                    },\n                    {\n                      y: 0,\n                      percent: 1,\n                      easing: 'bounceOut'\n                    }\n                  ]\n                }\n              }\n            ]\n          };\n        }\n      }\n    };\n\n    myChart.setOption(option);\n  });\n```\n\n### Loading Lottie animations\n\nIn order to fully exploit the power of new keyframe animations, Yi Shen from the ECharts team wrote a [Lottie animation parsing library](https://github.com/pissang/lottie-parser) that can parse Lottie animation files into the ECharts graphics format for rendering. Combined with Lottie's expressive power we can introduce more amazing animations to our projects:\n\n<iframe src=\"https://codesandbox.io/embed/eager-ives-yiqn7?fontsize=14&hidenavigation=1&theme=dark&codemirror=1\"\n     style=\"width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;\"\n     title=\"eager-ives-yiqn7\"\n     allow=\"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr- spatial-tracking\"\n     sandbox=\"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts\"\n   ></iframe>\n\n## Graphical component transition animations\n\nWe have provided more flexible transition animation configurations for elements returned in the custom series in 5.0. The `transition`, `enterFrom`, and `leaveTo` configuration items allow you to configure which properties of each element will have transition animations and how they will be animated when the graphic is created and removed. Here is an example.\n\n```js\nfunction renderItem() {\n  //...\n  return {\n    //...\n    x: 100,\n    // 'style', 'x', 'y' will be animated\n    transition: ['style', 'x', 'y'],\n    enterFrom: {\n      style: {\n        // Fade in\n        opacity: 0\n      },\n      // Fly in from the left\n      x: 0\n    },\n    leaveTo: {\n      // Fade out\n      opacity: 0\n    },\n    // Fly out to the right\n    x: 200\n  };\n}\n```\n\nIn 5.3.0 we extended the configuration of these transition animations to the graphic component, with made additional enhancements.\n\nIf you don't want to write out each property to be animated, you can now directly configure `transition: 'all'` to animate all properties.\n\nWe also added `enterAnimation`, `updateAnimation`, and `leaveAnimation` to configure the `duration`, `delay`, and `easing` of the entry, update, and exit animations for each graphic, respectively. Gradient colors now also support animations.\n\n## New SVG renderer\n\nIn 5.3.0 we refactored our SVG renderer, which delivers 2x ~ 10x performance improvements, and even tens of times in some special scenes.\n\nPreviously, we updated the SVG renderer directly from the render queue to the DOM, but since zrender's graphics properties were not one-to-one with the DOM, we had to implement very complex diff logic in the middle, which was error-prone and did not provide the best performance in some scenarios. In this version, we reconstruct the full rendering to VDOM first, and then patch the VDOM to DOM to finish the rendering. Full rendering avoids potential bugs caused by complex diff logic, and the one-to-one correspondence between VDOM and DOM ensures that updates are minimal when patching, resulting in a huge performance boost.\n\n[This example](https://echarts.apache.org/examples/zh/editor.html?c=geo-svg-scatter-simple&renderer=svg) gives you an intuitive impression of the performance improvement. The new version is much smoother than the previous version when dragging the chart in SVG mode.\n\n|             5.2.2 (Before)             |            5.3.0 (After)             |\n| :------------------------------------: | :----------------------------------: |\n| ![before](images/5-3-0/svg-before.gif) | ![after](images/5-3-0/svg-after.gif) | ! |\n\nIn addition to the performance improvement, we can do more things with the rendered VDOM, such as server-side rendering, which will be described below.\n\n## Server-side Rendering with Zero Dependencies\n\nIn previous versions, ECharts could also implement server-side rendering, but it had to rely on [node-canvas](https://github.com/Automattic/node-canvas), or [JSDOM](https://github.com/jsdom/jsdom) if you were using SVG mode to simulate the DOM environment. These dependencies not only bring additional size and usage requirements, but also affect performance.\n\nThis new SVG renderer allows us to get the string from the intermediate rendered VDOM, bringing completely zero-dependency server-side rendering and outputting a more refined SVG string integrated CSS animation.\n\n```ts\nconst echarts = require('echarts');\n\n// In SSR mode the first parameter does not need to be passed in as a DOM object\nconst chart = echarts.init(null, null, {\n  renderer: 'svg', // must use SVG mode\n  ssr: true, // enable SSR\n  width: 400, // need to specify height and width\n  height: 300\n});\n\n// setOption as normal\nchart.setOption({\n  xAxis: {\n    type: 'category',\n    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']\n  },\n  yAxis: {\n    type: 'value'\n  },\n  series: [\n    {\n      data: [120, 200, 150, 80, 70, 110, 130],\n      type: 'bar'\n    }\n  ]\n});\n\n// Output string\nconst svgStr = chart.renderToSVGString();\n```\n\nWe build the simplest NodeJS server in CodeSandbox and then use the ECharts server to render the effect as follows\n\n<iframe src=\"https://codesandbox.io/embed/heuristic-leftpad-oq23t?autoresize=1&codemirror=1&fontsize=12&hidenavigation=1&&theme= dark\"\n     style=\"width:100%; height:400px; border:0; border-radius: 4px; overflow:hidden;\"\n     title=\"heuristic-leftpad-oq23t\"\n     allow=\"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr- spatial-tracking\"\n     sandbox=\"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts\"\n   ></iframe>\n\n## Customizing Map Projections\n\nMaps have always been a very widely used component in ECharts. Typically a map component uses GeoJSON formatted data with latitude and longitude stored. ECharts then calculates the appropriate display area and maps the latitude and longitude linearly to that area. This is the simplest way to project a map. However, the simple linear projection does not work for complex map scenarios, such as using [Albers](https://en.wikipedia.org/wiki/Albers_projection) projection to solve the distortion problem in linear projection, or having the Pacific in the middle of the world map, etc.\n\nSo in 5.3.0 we introduced extending map projection. It tells ECharts how to project coordinates and how to calculate latitude and longitude from the projected coordinates via the `project` and `unproject` methods. The following is a simple example of using the Mercator projection.\n\n```ts\nseries = {\n  type: 'map',\n  projection: {\n    project: point => [\n      (point[0] / 180) * Math.PI,\n      -Math.log(Math.tan((Math.PI / 2 + (point[1] / 180) * Math.PI) / 2))\n    ],\n    unproject: point => [\n      (point[0] * 180) / Math.PI,\n      ((2 * 180) / Math.PI) * Math.atan(Math.exp(point[1])) - 90\n    ]\n  }\n};\n```\n\nIn addition to implementing our own projection formula, we can also use projections implementations provided by third-party libraries such as [d3-geo](https://github.com/d3/d3-geo).\n\n```ts\nconst projection = d3.geoConicEqualArea();\n// ...\nseries = {\n  type: 'map',\n  projection: {\n    project: point => projection(point),\n    unproject: point => projection.invert(point)\n  }\n};\n```\n\nIn conjunction with the new global transition animation feature added in 5.2, we can animate the transition between different projection effects: !\n\n![map-projection-animation](images/5-3-0/map-projection.gif)\n\nIn addition to the map projection, we have made the following two enhancements to the map in this release.\n\n- Provided `'LineString'` and `'MultiLineString'` support for GeoJSON data.\n- Changed the calculation of the default label position from the center of the bounding box to the centroid of the largest area for more accurate results.\n\n## Ticks Alignment of Multiple Axes\n\nTicks alignment of multiple axes is a long-standing requirement in the community, and we can see many articles in the community on how to implement axis alignment in ECharts, which is usually troublesome and limited.\n\nIn 5.3.0, we finally introduced the feature of aligning ticks on the `'value'` and `'log'` axes. You can configure `alignTicks: true` in the axis that needs to be aligned. The axis will then adjust its own ticks according to the first axis's ticks, enabling automatic alignment.\n\n```js live { layout: 'bt' }\noption = {\n  tooltip: {\n    trigger: 'axis'\n  },\n  legend: {},\n  xAxis: [\n    {\n      type: 'category',\n      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n      axisPointer: {\n        type: 'shadow'\n      }\n    }\n  ],\n  yAxis: [\n    {\n      type: 'value',\n      name: 'Precipitation',\n      alignTicks: true,\n      axisLabel: {\n        formatter: '{value} ml'\n      }\n    },\n    {\n      type: 'value',\n      name: 'Temperature',\n      axisLabel: {\n        formatter: '{value} °C'\n      }\n    }\n  ],\n  series: [\n    {\n      name: 'Evaporation',\n      type: 'bar',\n      // prettier-ignore\n      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]\n    },\n    {\n      name: 'Precipitation',\n      type: 'bar',\n      // prettier-ignore\n      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]\n    },\n    {\n      name: 'Temperature',\n      type: 'line',\n      yAxisIndex: 1,\n      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]\n    }\n  ]\n};\n```\n\n## Disable Emphasis and Select State\n\nThe `emphasis` state in ECharts provides feedback to the user when the mouse is over an element, but in a chart with a large number of elements, the highlighting animation can cause performance issues. In particular, highlighting triggered by [tooltip](${optionPath}tooltip) or [legend](${optionPath}tooltip) component linkage can highlight multiple elements at the same time.\n\nTherefore, in this release we have added `emphasis.disabled` configuration. If you don't need the highlighting feedback and you are concerned about the interactivity, you can disable the `emphasis` state with this option.\n\nFor the `select` state, we have also added `select.disabled`. This option can be used to configure some of the data to be unselectable.\n\n## Support for Selecting Entire Series\n\nAs of 5.3.0 we support configuring `selectedMode` to `'series'` to enable selection of all data in a series.\n\n## Formatting of Values in Tooltip\n\nTooltips can be used to display more detailed information about the data item when the user hovers it. ECharts also provides a `formatter` callback function to give developers more flexibility to customize the content of the tooltip.\n\nHowever, we found that most of the time, developers only needed to format the value part of the tooltip, such as fixed precision, prefixed with `$`, etc. Previously, in order to format the number, developers had to rewrite the entire content of the tooltip with `formatter`. Especially after 5.0, ECharts hint boxes have become more complex and beautiful, so rewriting them becomes costly and difficult to achieve the default results.\n\nSo in this version, we have added a `valueFormatter` configuration to the tooltip for formatting the value part.\n\nAs in the axis alignment example, we can add the °C and ml suffixes to the value part of the tooltip.\n\n```js live { layout: 'bt' }\noption = {\n  tooltip: {\n    trigger: 'axis'\n  },\n  legend: {},\n  xAxis: [\n    {\n      type: 'category',\n      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],\n      axisPointer: {\n        type: 'shadow'\n      }\n    }\n  ],\n  yAxis: [\n    {\n      type: 'value',\n      name: 'Precipitation',\n      alignTicks: true,\n      axisLabel: {\n        formatter: '{value} ml'\n      }\n    },\n    {\n      type: 'value',\n      name: 'Temperature',\n      axisLabel: {\n        formatter: '{value} °C'\n      }\n    }\n  ],\n  series: [\n    {\n      name: 'Evaporation',\n      type: 'bar',\n      tooltip: {\n        valueFormatter: value => value + ' ml'\n      },\n      // prettier-ignore\n      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]\n    },\n    {\n      name: 'Precipitation',\n      type: 'bar',\n      tooltip: {\n        valueFormatter: value => value + ' ml'\n      },\n      // prettier-ignore\n      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]\n    },\n    {\n      name: 'Temperature',\n      type: 'line',\n      yAxisIndex: 1,\n      tooltip: {\n        valueFormatter: value => value + ' °C'\n      },\n      data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]\n    }\n  ]\n};\n```\n\nEach series can configure its own `valueFormatter` according to its own value format.\n\n## More Flexible Sector Corner Radius\n\nIn 5.0 we have added rounded corners configuration for sectors, which can make pie charts, sunburst charts more interesting. Previously, we only supported the inner and outer radius separately, this time we go a step further and support the four corners of the sector to be configured with different corner radius to bring more flexible display.\n\n```js live { layout: 'lr', height: 400 }\noption = {\n  tooltip: {\n    trigger: 'item'\n  },\n  legend: {\n    top: '5%',\n    left: 'center'\n  },\n  series: [\n    {\n      name: 'Access From',\n      type: 'pie',\n      radius: ['30%', '70%'],\n      roseType: 'angle',\n      itemStyle: {\n        borderRadius: [20, 5, 5, 10],\n        borderColor: '#fff',\n        borderWidth: 2\n      },\n      label: {\n        show: false\n      },\n      data: [\n        { value: 800, name: 'Search Engine' },\n        { value: 735, name: 'Direct' },\n        { value: 580, name: 'Email' },\n        { value: 484, name: 'Union Ads' },\n        { value: 400, name: 'Video Ads' }\n      ]\n    }\n  ]\n};\n```\n\n## Complex Label Optimization for Pie charts\n\nPie charts have always been one of the most complex charts on the label display in ECharts. We have been optimizing the layout and display of the pie chart labels for a long time.\n\nThis time, we have done a deep optimization for pie chart labels that use text wrapping, background colors, rich text, and other complex layouts. In the adaptive width, container overflow, guide line calculation than before there are better results:\n\n|                5.2.2 (Before)                 |                5.3.0 (After)                |\n| :-------------------------------------------: | :-----------------------------------------: |\n| ![before](images/5-3-0/pie-label-before.png)  | ![after](images/5-3-0/pie-label-after.png)  | ! |\n| ![before](images/5-3-0/pie-label-before2.png) | ![after](images/5-3-0/pie-label-after2.png) | ! |\n\n## bar chart large mode optimization\n\nIn the cases of a large amount of data (> 2k), we support bar charts to speed up rendering and improve interactive performance by turning on [large](${optionPath}series-bar.large) mode. But previously the layout of bar charts in [large](${optionPath}series-bar.large) mode was simple and did not support the layout after stacking multiple series. In 5.3.0, we have optimized the layout of [large](${optionPath}series-bar.large) mode to be consistent with the normal mode. We can optimize the performance of the bar chart in more scenarios by turning on [large](${optionPath}series-bar.large).\n\nIn addition, the optimized bar chart layout also fixes the bug of incorrect stacking on non-linear axes like logarithmic axes.\n\n## Breaking Changes\n\n### registerMap and getMap methods need to be used only after the map chart is imported\n\nTo reduce the size of the minimum bundle, we removed the map data management methods `getMap` and `registerMap` from the core module.\n\nIf you are [only importing necessary charts and components](https://echarts.apache.org/handbook/en/basics/import/#importing-required-charts-and-components-to-have-minimal-bundle), you need to ensure that you have imported `GeoComponent` or `MapChart` before you can register map data with `registerMap`.\n\n```ts\nimport * as echarts from 'echarts/core';\nimport { MapChart } from 'echarts/charts';\n\necharts.use([MapChart]);\n\n// You must import the MapChart with the `use` method before you can register the map with registerMap\necharts.registerMap('world', worldJSON);\n```\n\nIf you are using `import * as echarts from 'echarts'` to import the whole package, this change will not affect you in any way.\n\n### Removing the default bolding emphasis effect in the line chart\n\nWe introduced the default bolding emphasis effect for line charts in 5.0, but the community feedback was that this didn't looks well in many scenarios. So in this version we changed this effect from on by default to off by default. You can enable it by:\n\n```ts\nseries = {\n  type: 'line',\n  //...\n  emphasis: {\n    lineStyle: {\n      width: 'bolder'\n    }\n  }\n};\n```\n\n## Full Changelog\n\nView the [Changelog](${mainSitePath}/changelog.html#v5-3-0)\n"}}]);