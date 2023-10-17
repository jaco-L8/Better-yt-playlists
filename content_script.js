// Put all the javascript code here, that you want to execute after page load.

console.log('Better Playlists Content Script Loaded');

let created_input = false;

let add_to_playlist = (url) => {
  let pd = document.getElementById('playlist_input');
  console.log(`adding ${url} to playlist`);
  let vid = url.split('=')[1];

  let contents = document.createElement('img');
  contents.setAttribute(
    'class',
    'yt-simple-endpoint inline-block style-scope ytd-thumbnail'
  );
  contents.src = `https://img.youtube.com/vi/${vid}/0.jpg`;
  contents.setAttribute('style', 'width: 300px; height: auto;');

  pd.appendChild(contents);
};

let main = () => {
  let our_input = document.getElementById('playlist_input');

  our_input.addEventListener('input', (e) => {
    add_to_playlist(our_input.value);
    our_input.value = '';
  });
};

let create_input = () => {
  let target = document.querySelector(
    'ytd-rich-grid-renderer.style-scope > div:nth-child(1)'
  );
  let playlist_div = document.createElement('div');
  playlist_div.setAttribute('id', 'playlist_input');
  playlist_div.setAttribute('class', 'style-scope ytd-rich-grid-renderer');
  playlist_div.setAttribute('style', 'overflow: scroll;');
  target.before(playlist_div);
  created_input = true;
};

document.addEventListener('yt-navigate-finish', (e) => {
  console.log('youtube finished loading');
  if (!created_input) {
    create_input();
  }
  main();
});

document.addEventListener('dragstart', (e) => {
  if (e.dataTransfer) {
    let url = e.dataTransfer.getData('URL');
    add_to_playlist(url);
  }
  //console.log(e);
});
