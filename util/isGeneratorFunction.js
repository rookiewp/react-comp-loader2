export default function(fn) {
  if (!fn) return false;
  const { constructor } = fn;
  if (!constructor) return false;
  if (constructor.name === 'GeneratorFunction') {
    return true;
  } else {
    return false;
  }
}