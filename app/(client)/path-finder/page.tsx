import PathFinderLoader from './PathFinderLoader';

export const metadata = {
    title: 'Path Finder — CogniSkills',
    description: 'Visual Spatial Golf cognitive training game. Train visual memory, planning, and route recall.',
    robots: { index: false },
};

export default function PathFinderPage() {
    return <PathFinderLoader />;
}
