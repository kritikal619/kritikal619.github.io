const Notices = {
  container: null,
  init() {
    this.container = document.getElementById('fc-mobile-notices-list');
    if (!this.container) return;
    this.load();
  },
  load() {
    this.container.innerHTML = '<p>공지사항을 불러오는 중입니다...</p>';
    fetch('card/api/notices.json')
      .then(r => r.json())
      .then(data => this.render(data))
      .catch(err => {
        console.error('공지사항 로드 실패', err);
        this.container.innerHTML = '<p>공지사항을 불러오지 못했습니다.</p>';
      });
  },
  render(data) {
    if (!data || !Array.isArray(data.notices)) {
      this.container.innerHTML = '<p>표시할 공지사항이 없습니다.</p>';
      return;
    }

    const list = document.createElement('div');
    list.className = 'notices-list';

    data.notices.forEach(n => {
      const item = document.createElement('div');
      item.className = 'notice-card';
      const summary = n.summary && n.summary !== '내용을 불러올 수 없습니다.'
        ? `<p class="notice-summary">${this.escape(n.summary)}</p>` : '';
      item.innerHTML = `
        <h3 class="notice-title">${this.escape(n.title)}</h3>
        ${summary}
        <a class="notice-more" href="${this.escape(n.href)}" target="_blank">더보기</a>
      `;
      list.appendChild(item);
    });

    this.container.innerHTML = '';
    if (data.last_updated) {
      const updated = document.createElement('div');
      updated.className = 'notices-last-updated';
      updated.textContent = '마지막 업데이트: ' + data.last_updated;
      this.container.appendChild(updated);
    }
    this.container.appendChild(list);
  },
  escape(str) {
    return str.replace(/[&<>'"/]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;'}[s]));
  }
};

document.addEventListener('DOMContentLoaded', () => Notices.init());
