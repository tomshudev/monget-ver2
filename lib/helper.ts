async function regSw() {
  if ('serviceWorker' in navigator) {
    let url = 'https://tom-axiom.local:3002/sw.js'
    const reg = await navigator.serviceWorker.register(url, { scope: '/' })
    console.log('service config is', { reg })
    return reg
  }
  throw Error('serviceworker not supported')
}

async function subscribe(
  serviceWorkerReg: ServiceWorkerRegistration,
  saveSubscription,
  setTest
) {
  navigator.serviceWorker.ready.then(async () => {
    // setTest(JSON.stringify(serviceWorkerReg.pushManager.getSubscription()))
    // let subscription = await serviceWorkerReg.pushManager.getSubscription()

    // if (subscription) {
    //   console.log('removing', { subscription })
    //   subscription.unsubscribe()
    // } else {
    //   if (subscription === null) {
    const subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        'BPPq3K-M3rT-X7zSwAMC7AROqXgGb-UKWEX-zjlrGpQQzNi9rwNQnxk1CLaQEFg5sflzNL7_X6arTty4qX2XMHg',
    })

    console.log('after', { subscription })

    saveSubscription(subscription)
    //   }
    // }
  })
}

export { regSw, subscribe }
