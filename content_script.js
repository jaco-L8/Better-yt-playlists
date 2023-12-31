// Put all the javascript code here, that you want to execute after page load.

console.log('Better Playlists Content Script Loaded');

let created_input = false;

let add_to_playlist = (url) => {
  console.log(`adding ${url} to playlist`);
};

let main = () => {
  let our_input = document.getElementById('search_input');

  our_input.addEventListener('input', (e) => {
    add_to_playlist(our_input.value);
    our_input.value = '';
  });
};

let create_input = () => {
  let target = document.querySelector('#end');
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'search_input');
  input.setAttribute(
    'style',
    'width: 40px; height: 30px; margin-bottom: 10px;'
  );

  target.appendChild(input);
  created_input = true;
};

document.addEventListener('yt-navigate-finish', (e) => {
  console.log('youtube finished loading');
  if (!created_input) {
    create_input();
  }
  main();
});
