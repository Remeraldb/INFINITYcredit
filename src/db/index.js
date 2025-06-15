export function saveState(state) {
  localStorage.setItem('clickerGame', JSON.stringify(state));
}

export function loadState() {
  const state = localStorage.getItem('clickerGame');
  return state ? JSON.parse(state) : null;
}