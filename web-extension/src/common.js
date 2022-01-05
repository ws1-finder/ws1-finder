let currentResults = null

const ClearCache = () => {
  currentResults = null
}

const BaseURL = (success) => {
  browser.storage.sync.get({
    vmwareOneUrl: 'https://myvmware.workspaceair.com'
  }, (response) => {
    success(response.vmwareOneUrl)
  })
}

const checkAuthenticated = (results) => {
  if (results.status === 401) {
    BaseURL((url) => {
      browser.tabs.create({ url: url })
      browser.runtime.sendMessage({
        msg: 'close-ws1-finder'
      })
    })
  }
  return results
}

const GetEntitlements = (success) => {
  if (currentResults !== null) {
    success(currentResults)
  } else {
    BaseURL((url) => {
      fetch(url + '/catalog-portal/services/api/entitlements', {
        credentials: 'include'
      }).then(checkAuthenticated)
        .then(res => res.json())
        .then(filterResults)
        .then(sortResults)
        .then(storeEntitlements)
        .then(success)
    })
  }
}

const sortResults = (results) => {
  return results.sort(function (a, b) { return b.favorite - a.favorite })
}

const filterResults = (results) => {
  return results._embedded.entitlements.filter(function (entitlement) {
    const links = entitlement._links
    return ('launch' in links) && !('appLaunchUrls' in links) && !('appLaunchUrlsV2' in links)
  })
}

const storeEntitlements = (results) => {
  if ('_embedded' in results) {
    currentResults = results
  } else {
    currentResults = null
  }
  return results
}

export { BaseURL, GetEntitlements, ClearCache }
