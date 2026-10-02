// โหลดสคริปต์ AdSense หลัก (Auto Ads / Vignette Ads)
(function() {
    var adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX";
    adScript.crossOrigin = "anonymous";
    document.head.appendChild(adScript);
})();

// ฟังก์ชันสร้าง Banner โฆษณาด้านล่างให้อัตโนมัติ
function renderBottomAd() {
    var adContainers = document.querySelectorAll('.ad-container-bottom');
    adContainers.forEach(function(container) {
        container.innerHTML = `
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="9876543210"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        `;
        (adsbygoogle = window.adsbygoogle || []).push({});
    });
}

// สั่งให้ทำงานเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener("DOMContentLoaded", renderBottomAd);