//푸시
self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon,
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  
  //웹앱 https://fe-developers.kakaoent.com/2023/230202-a2hs/
  self.addEventListener("fetch", e => {});
