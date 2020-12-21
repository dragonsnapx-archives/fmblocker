const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
let removedPages = 0;

const syncStorage = chrome.storage.sync;

syncStorage.get(['fmblocker_blocklist'], fmblocklist => {
	$$('.fm_best_widget > ul > li').forEach(posts => {

		console.log('DEBUG Point')

		fmblocklist = {
			유머: "*",
			미스터리: ['우주/과학']
		}

		const galleryName = posts.querySelector('.category').textContent.trim();
		const [galleryParent, galleryChild] = galleryName.split('-').map(e => e.trim());

		// First, block all the blocked galleries
		if(Object.keys(fmblocklist).length !== 0 && fmblocklist && fmblocklist.hasOwnProperty(galleryParent)){
			// Check if asks to block all content from parent gallery
			if(fmblocklist[galleryParent] === '*'){
				posts.classList.add('fmblocker-hidden-post');
				removedPages++;
				return;
			}else{
				if(fmblocklist[galleryParent].includes(galleryChild)){
					posts.classList.add('fmblocker-hidden-post');
					removedPages++;
					return;
				}
			}
		}

		let blockingHtml = `<button class="fmblocker-button" data-blocking="${galleryParent}" data-relation="parent" style="margin-right: 3px"> ${galleryParent} 블라인드 </button>`;
		blockingHtml += galleryChild ? `<button class="fmblocker-button" data-blocking="${galleryChild}" data-blocking-parent="${galleryParent}" data-relation="child"> ${galleryChild} 블라인드 </button>` : ''

		// Then, show the 'block' button on all pages
		posts.querySelector('.category').insertAdjacentHTML('beforeend',
			blockingHtml)
	})

	$('.bd_tl').insertAdjacentHTML('beforeend', `<div> 총 ${removedPages}개 포스트 블라인드 </div>`)

	$$('.fmblocker-button').forEach(button => {
		button.addEventListener('click', () => {
			const isParent = button.target.getAttribute('data-relation').trim() === 'parent';
			const blockingGallery = button.target.getAttribute('data-blocking').trim();

			if(isParent){
				syncStorage.get(['fmblocker_blocklist'], result => {
					syncStorage.set({

					})
				})
			}
		});
	})
});
