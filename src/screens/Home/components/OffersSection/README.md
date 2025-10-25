# OffersSection Component

A dynamic offers section component that displays offer cards with alternating background colors.

## Features

- **Dynamic Data**: Accepts offers data as props
- **Alternating Colors**: Odd positions use `#0080F7`, even positions use `#0A2277`
- **Frame Images**: Odd positions show `oddFrame` (top-left), even positions show `evenFrame` (top-right)
- **Responsive Design**: Uses ResponsiveDimensions for consistent sizing
- **TypeScript Support**: Fully typed with TypeScript interfaces

## Usage

### Basic Usage (Default Offers)

```tsx
import { OffersSection } from './components';

<OffersSection />;
```

### Custom Offers Data

```tsx
import { OffersSection } from './components';

const customOffers = [
  {
    id: '1',
    title: '15 DAYS',
    description: 'Fast approval process',
  },
  {
    id: '2',
    title: '5%',
    description: 'Low interest rate',
  },
  {
    id: '3',
    title: 'FREE',
    description: 'No processing fees',
  },
];

<OffersSection offers={customOffers} />;
```

## Props

| Prop   | Type    | Required | Default        | Description            |
| ------ | ------- | -------- | -------------- | ---------------------- |
| offers | Offer[] | No       | Default offers | Array of offer objects |

## Offer Interface

```typescript
interface Offer {
  id: string;
  title: string;
  description: string;
}
```

## Styling

- **Odd Position (1st, 3rd, 5th...)**:
  - Background: `#0080F7` (Blue)
  - Frame: `oddFrame` image positioned top-left
- **Even Position (2nd, 4th, 6th...)**:
  - Background: `#0A2277` (Dark Blue)
  - Frame: `evenFrame` image positioned top-right
- **Card Layout**: Flex row with equal width cards
- **Frame Images**: 40x40px, positioned absolutely in corners
- **Responsive**: Adapts to different screen sizes

## Example with Multiple Offers

```tsx
const multipleOffers = [
  { id: '1', title: '7 DAYS', description: 'Quick approval' },
  { id: '2', title: '20%', description: 'Interest rate' },
  { id: '3', title: 'FREE', description: 'No fees' },
  { id: '4', title: '24/7', description: 'Customer support' },
];

<OffersSection offers={multipleOffers} />;
```

This will render 4 cards with alternating colors and frame images:

- Card 1: Blue (#0080F7) + oddFrame (top-left)
- Card 2: Dark Blue (#0A2277) + evenFrame (top-right)
- Card 3: Blue (#0080F7) + oddFrame (top-left)
- Card 4: Dark Blue (#0A2277) + evenFrame (top-right)
