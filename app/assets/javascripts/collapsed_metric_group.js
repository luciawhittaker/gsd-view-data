(function (global) {
  var $ = global.jQuery

  $.fn.collapsibleMetricGroup = function () {
    // Determine which metric item has been sorted on. If we can't determine
    // it, then abort.
    var selectedMetricItem = $('[data-behaviour="o-filter-panel"] option:selected').val()
    if (!selectedMetricItem) {
      return
    }

    $(this).each(function (idx, element) {
      var metricItem = $(element).find('[data-metric-item-identifier="' + selectedMetricItem + '"]')
      var metricItemDescription = metricItem.data('metric-item-description')

      var metricGroup = $(element)
      var collapsedHeaderContainer = $('<div />', { 'class': 'm-metric-group-header' })
      var metricItemDescriptionContainer = $('<div />', { 'class': 'm-metric-item-description' })
      var toggleLinkOpenContainer = $('<div />', { 'class': 'm-metric-group-open-toggle' })
      var collapsedContainer = $(
        '<div data-metric-group-collapsible>')
        .addClass('m-metric-group__collapsible')
        .append(collapsedHeaderContainer, metricItemDescriptionContainer, toggleLinkOpenContainer)

      // Find the "expanded" container, this has the full metric group
      // information. Build the collapsed container with it's elements.
      var expandedContainer = $(element).find('[data-metric-group-expanded]')
      var toggleLinkCloseContainer = $('<div />', { 'class': 'm-metric-group-close-toggle' })

      // Populate the collapsed header container, with the header from the
      // expanded variant.
      var heading = $(element).find('.m-metric-group-header h2').clone()
      collapsedHeaderContainer.append(heading)

      // Populate the metric item description container, using HTML unescaped
      // content from the data attribute.
      metricItemDescriptionContainer.html(metricItemDescription)
      collapsedContainer.append(metricItemDescriptionContainer)

      // Define behaviours for expaning and collapsing, to be triggered in
      // event handlers.
      var expand = function () {
        collapsedContainer.hide()
        expandedContainer.show()
        metricGroup.removeClass('m-metric-group__collapsed')
        metricGroup.addClass('m-metric-group__expanded')
      }

      var collapse = function () {
        collapsedContainer.show()
        expandedContainer.hide()
        metricGroup.removeClass('m-metric-group__expanded')
        metricGroup.addClass('m-metric-group__collapsed')
      }

      // Create an open link, and give it a click behaviour to show the
      // expanded variant.
      var openLink = $('<a href="#">Open</a>')
      openLink.on('click', function (e) {
        e.preventDefault()

        expand()
      })
      toggleLinkOpenContainer.append(openLink)
      collapsedContainer.append(toggleLinkOpenContainer)

      // Create a closed link, and make its click behaviour hide
      // the expanded variant.
      var closeLink = $('<a href="#">Close</a>')
      closeLink.on('click', function (e) {
        e.preventDefault()

        collapse()
      })
      toggleLinkCloseContainer.append(closeLink)
      expandedContainer.prepend(toggleLinkCloseContainer)

      // Add the collapsed container to the metric group, and hide the
      // expanded container.
      $(element).append(collapsedContainer)
      expandedContainer.hide()
    })
  }

  $(document).ready(function () {
    $('[data-behaviour~="m-metric-group__collapsible"]').collapsibleMetricGroup()
  })
})(window)
