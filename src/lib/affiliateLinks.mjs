const AFFILIATE_URL_PATTERNS = [
  /[?&](ref|fp_ref|fpr|via)=/i,
  /^https:\/\/free-trial\.adcreative\.ai\//i,
  /^https:\/\/publer\.com\/toolpolaris\/?$/i,
];

const INTERNAL_HOSTNAMES = new Set(['toolpolaris.com', 'www.toolpolaris.com']);

export function isAffiliateUrl(href) {
  if (typeof href !== 'string') {
    return false;
  }

  return AFFILIATE_URL_PATTERNS.some((pattern) => pattern.test(href));
}

export function isExternalUrl(href) {
  if (typeof href !== 'string') {
    return false;
  }

  try {
    const url = new URL(href, 'https://toolpolaris.com');
    return (url.protocol === 'http:' || url.protocol === 'https:') && !INTERNAL_HOSTNAMES.has(url.hostname);
  } catch {
    return false;
  }
}

function withRelValues(existingRel, valuesToAdd) {
  const relValues = Array.isArray(existingRel)
    ? existingRel
    : typeof existingRel === 'string'
      ? existingRel.split(/\s+/)
      : [];

  return Array.from(new Set([...relValues, ...valuesToAdd].filter(Boolean))).join(' ');
}

export function getCommercialOutboundRel(href, existingRel) {
  if (!isExternalUrl(href)) {
    return existingRel;
  }

  return withRelValues(existingRel, isAffiliateUrl(href) ? ['sponsored', 'nofollow'] : ['nofollow']);
}

export function rehypeAffiliateRel() {
  return (tree) => {
    const visit = (node) => {
      if (!node || typeof node !== 'object') {
        return;
      }

      if (node.type === 'element' && node.tagName === 'a') {
        const rel = getCommercialOutboundRel(node.properties?.href, node.properties?.rel);
        if (!rel) {
          return;
        }

        node.properties = {
          ...node.properties,
          rel,
        };
      }

      if (Array.isArray(node.children)) {
        node.children.forEach(visit);
      }
    };

    visit(tree);
  };
}
