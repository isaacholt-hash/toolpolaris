const AFFILIATE_URL_PATTERNS = [
  /[?&](ref|fp_ref|fpr|via)=/i,
  /^https:\/\/free-trial\.adcreative\.ai\//i,
  /^https:\/\/publer\.com\/toolpolaris\/?$/i,
];

export function isAffiliateUrl(href) {
  if (typeof href !== 'string') {
    return false;
  }

  return AFFILIATE_URL_PATTERNS.some((pattern) => pattern.test(href));
}

function withAffiliateRel(existingRel) {
  const relValues = Array.isArray(existingRel)
    ? existingRel
    : typeof existingRel === 'string'
      ? existingRel.split(/\s+/)
      : [];

  return Array.from(new Set([...relValues, 'sponsored', 'nofollow'])).join(' ');
}

export function rehypeAffiliateRel() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== 'object') {
        return;
      }

      if (node.type === 'element' && node.tagName === 'a' && isAffiliateUrl(node.properties?.href)) {
        node.properties = {
          ...node.properties,
          rel: withAffiliateRel(node.properties?.rel),
        };
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}
