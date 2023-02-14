import CalculateIcon from '@mui/icons-material/Calculate'
import BarChartIcon from '@mui/icons-material/BarChart'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import StorageIcon from '@mui/icons-material/Storage'
import KeyIcon from '@mui/icons-material/Key'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export const appFeatures = [
    {
        id: 1,
        icon: <CalculateIcon fontSize='large' />,
        iconBg: "bg-yellow-400",
        title: "Recipes Costing",
        explained: "No more reliance to Excel spreadsheets. Rapid & intelligent display of recipes data.",
        featuresList: [
            "No more reliance to Excel spreadsheets.",
            "Rapid & intelligent presentation of recipes data"
        ]
    },
    {
        id: 2,
        icon: <BarChartIcon fontSize='large' />,
        iconBg: "bg-yellow-400",
        title: "GPs Safety Tests",
        explained: "Test desired GP(%) and selling prices and vice-versa.",
        featuresList: [
            "Quick conversion of prices into cost per ingredients.",
            "Selling price test towards GPs safety zones (above 75%)."
        ]
    },
    {
        id: 3,
        icon: <SettingsSuggestIcon fontSize='large' />,
        iconBg: "bg-yellow-400",
        title: "Managing Ingredients",
        explained: "Create ingredients to your preferences. Access and manage a resourceful database of groceries.",
        featuresList: [
            "Create ingredients to your preferences.",
            "Manage your suppliers data accurately."
        ]
    },
    {
        id: 4,
        icon: <StorageIcon fontSize='large' />,
        iconBg: "bg-yellow-400",
        title: "Recipes Costs Database",
        explained: "Save and update your recipes valuations into categories. Track and easily find those valuation from a secure database.",
        featuresList: [
            "Save and update your recipes valuations into categories.",
            "Track and easily find those valuation from a secure database."
        ]
    },
    {
        id: 5,
        icon: <KeyIcon fontSize='large' />,
        iconBg: "bg-yellow-400",
        title: "Prerequisites",
        explained: "An internet connection and any of the modern computer's operating systems and browsers will suffice.",
        featuresList: [
            "Window or Mac operating systems.",
            "Internet connection.",
        ]
    },
    {
        id: 6,
        icon: <QuestionMarkIcon fontSize='large' />,
        iconBg: "bg-yellow-400",
        title: "Why CINTEL App",
        explained: "Get started immediately. Easy to use, safe & secure, access anywhere and only monthly subscriptions.",
        featuresList: [
            "No installation required and get started immediately.",
            "Simple and easy to use.",
            "Safe and secure.",
            "Compute and Access your data anywhere.",
            "No contract, only monthly subscription."
        ]
    },
]