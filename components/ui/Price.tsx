'use client';

import { useEffect, useState } from 'react';

export default function Price({ price }: { price: number }) {
  const [formatted, setFormatted] = useState(price.toString());

  useEffect(() => {
    setFormatted(new Intl.NumberFormat('uz-UZ').format(price));
  }, [price]);

  return <span>{formatted} so'm</span>;
} 