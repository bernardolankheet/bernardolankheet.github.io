// Lightbox for timeline images
document.addEventListener('DOMContentLoaded', function() {
  // Create lightbox elements
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  
  const closeBtn = document.createElement('span');
  closeBtn.className = 'lightbox-close';
  closeBtn.innerHTML = '&times;';
  
  const lightboxImg = document.createElement('img');
  lightboxImg.alt = 'Expanded image';
  
  const hint = document.createElement('div');
  hint.className = 'lightbox-hint';
  hint.textContent = 'Clique em qualquer lugar para fechar';
  
  overlay.appendChild(closeBtn);
  overlay.appendChild(lightboxImg);
  overlay.appendChild(hint);
  document.body.appendChild(overlay);
  
  // Close lightbox function
  function closeLightbox() {
    overlay.classList.remove('active');
  }
  
  // Open lightbox function
  function openLightbox(imgSrc) {
    lightboxImg.src = imgSrc;
    overlay.classList.add('active');
  }
  
  // Close on overlay click
  overlay.addEventListener('click', closeLightbox);
  
  // Close on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  
  // Prevent closing when clicking on the image itself (optional - remove if you want click anywhere to close)
  lightboxImg.addEventListener('click', function(e) {
    e.stopPropagation();
  });
  
  // Add click handlers to timeline images
  function initTimelineImages() {
    const timelineImages = document.querySelectorAll('.nt-timeline-dot.bigger img');
    timelineImages.forEach(function(img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openLightbox(this.src);
      });
    });
  }
  
  // Initialize on page load
  initTimelineImages();
  
  // Re-initialize when page content changes (for SPA navigation)
  const observer = new MutationObserver(function(mutations) {
    initTimelineImages();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
