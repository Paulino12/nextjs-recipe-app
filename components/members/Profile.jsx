import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Menu, Transition } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Input from '../forms/Input'
import ButtonField from '../forms/ButtonField'
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel'
import SaveIcon from '@mui/icons-material/Save'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MainContext } from '../../contexts/MainContext'
import { NotificationsContext } from '../../contexts/NotificationsContext'
import Preloader from '../Preloader'
import ForgotPassword from '../auth/ForgotPassword'
import useDate from '../../customs hooks/useDate'

const Profile = ({ csrfToken }) => {

    const router = useRouter()

    const {
        setNotification, setShowNotification
    } = useContext(NotificationsContext)

    const {
        setNewFullname,
        showModal, setShowModal
    } = useContext(MainContext)

    const formatDate = useDate()

    const [editFullname, setEditFullname] = useState(false)
    const [editEmail, setEditEmail] = useState(false)

    const [userId, setUserId] = useState(null)
    const [profileFullname, setProfileFullname] = useState('')
    const [email, setEmail] = useState('')
    const [stripeCustomerId, setStripeCustomerId] = useState('')
    const [stripeSubscriptionPrice, setStripeSubscriptionPrice] = useState('')
    const [stripeSubscriptionId, setStripeSubscriptionId] = useState('')

    const [profileLoading, setProfileLoading] = useState(true)
    // Product details from stripe API
    const [active, setActive] = useState(false)
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [created, setCreated] = useState()
    const [trialEnd, setTrialEnd] = useState()
    const [currentPeriodStart, setCurrentPeriodStart] = useState()
    const [currentPeriodEnd, setCurrentPeriodEnd] = useState()
    const [startPeriod, setStartPeriod] = useState()
    const [endPeriod, setEndPeriod] = useState()
    const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false)
    // Invoice
    const [invoices, setInvoices] = useState([])
    const [showModalInvoices, setShowModalInvoices] = useState(false)
    // Upcoming Invoice
    const [amountDue, setAmountDue] = useState(0)
    const [startPeriodUpInvoice, setStartPeriodUpInvoice] = useState()
    const [noUpcomingInvoice, setNoUpcomingInvoice] = useState(false)

    const [signUpError, setSignUpError] = useState(false)
    const [signUpErrorMsg, setSignUpErrorMsg] = useState('')

    const fetchProfile = () => {
        axios.get('/api/auth/authed-user')
            .then((response) => {
                // check if the current logged in user has a subscription plan (subscribed)
                if(!response.data.stripeSubscriptionPrice){
                    setNotification("Please subscribe to explore recipes or Sign out.")
                    setShowNotification(true)
                    // redirect to cintelProducts to choose plans (standard or premium)
                    return router.push(`/members/stripe/cintelProducts`)
                }
                setUserId(response.data.userId)
                setProfileFullname(response.data.name)
                setEmail(response.data.email)
                setStripeCustomerId(response.data.stripeCustomerId)
                setStripeSubscriptionPrice(response.data.stripeSubscriptionPrice)
                setStripeSubscriptionId(response.data.stripeSubscriptionId)
                console.log(response.data.stripeSubscriptionPrice)
                setProfileLoading(false)
            })
            .catch((error) => { console.log(error) })
    }

    useEffect(() => {
        fetchProfile()
        // Line below removes useeffect warning about adding dependency
        // eslint-disable-next-line
    }, [])

    const handleProfile = (e) => {
        e.preventDefault()
        setProfileLoading(true)
        if(editFullname){
            // Save new fullname
            axios.put('/api/auth/authed-user', { userId, profileFullname, stripeCustomerId })
                .then((response) => {
                    setNewFullname(response.data.newProfile.fullname)
                    setNotification(response.data.message)
                    setShowNotification(true)
                    fetchProfile()
                    setEditFullname(false)
                    setProfileLoading(false)
                })
                .catch((error) => { console.log(error) })
        }else if(editEmail){
            // save email
            axios.put('/api/auth/authed-user', { userId, email, stripeCustomerId })
                .then((response) => {
                    setNotification(response.data.message)
                    setShowNotification(true)
                    fetchProfile()
                    setEditEmail(false)
                    setProfileLoading(false)
                    setSignUpError(false)
                    setSignUpErrorMsg('')
                })
                .catch((error) => { 
                    setSignUpError(true)
                    setSignUpErrorMsg(error.response.data.message)
                    setProfileLoading(false)
                 })
            
        }
       
    }

    // cancel editing fullname
    const handleCancelEditFullname = () => {
        setProfileLoading(true)
        setEditFullname(false)
        fetchProfile()
    }

    // cancel editing email
    const handleCancelEditEmail = () => {
        setProfileLoading(true)
        setEditEmail(false)
        fetchProfile()
        setSignUpError(false)
    }

    
    const [showSubsBtn, setShowSubsBtn] = useState(true)
    const [isLoadingSubsData, setIsLoadingSubsData] = useState(false)
    // Profile subscription
    const handleProfileSubscription = () => {
        setIsLoadingSubsData(true)
        setShowSubsBtn(false)
        console.log(stripeSubscriptionId)
        axios.get(`/api/profile/${stripeSubscriptionId}`)
            .then((response) => {
                setIsLoadingSubsData(false)
                setDescription(response.data.planName)
                setActive(response.data.active)
                setStatus(response.data.status)
                setCreated(formatDate.newDateFormat(response.data.dateCreated)[2])
                setTrialEnd(formatDate.newDateFormat(response.data.trialEnd)[2])
                setCurrentPeriodStart(formatDate.newDateFormat(response.data.currentPeriodStart)[0])
                setCurrentPeriodEnd(formatDate.newDateFormat(response.data.currentPeriodEnd)[0])
                if(!response.data.upcomingInvoice){
                    setNoUpcomingInvoice(true)
                }else{
                    setAmountDue(response.data.upcomingInvoice.amountDue)
                    setStartPeriodUpInvoice(formatDate.newDateFormat(response.data.upcomingInvoice.startPeriod)[0])
                }
                setInvoices(response.data.invoices)
                setCancelAtPeriodEnd(response.data.cancelAtPeriodEnd)
                console.log(response.data.cancelAtPeriodEnd, response.data.planName)
                setIsLoadingSubsData(false)
            })
            .catch((error) => { 
                // for admin without subscriptions
                setNotification(`You are admin, so no subscription: ${error.response.data.message}`)
                setShowNotification(true)
                setIsLoadingSubsData(false)
                setShowSubsBtn(true)
             })
    }

    // cancel subscription
    const cancelSubscription = () => {
        setProfileLoading(true)
        axios.put(`/api/profile/cancel`, {
            stripeSubscriptionId, userId
        })
            .then((response) => {
                setNotification(response.data)
                setShowNotification(true)
                fetchProfile()
                setShowSubsBtn(true)
                setProfileLoading(false)
            })
            .catch((error) => { console.log(error) })
    }

    // resume subscription
    const resumeSubscription = () => {
        setProfileLoading(true)
        axios.put(`/api/profile/resume`, {
            stripeSubscriptionId
        })
        .then((response) => {
            setNotification(response.data)
            setShowNotification(true)
            setNoUpcomingInvoice(false)
            fetchProfile()
            setShowSubsBtn(true)
            setProfileLoading(false)
        })
        .catch((error) => { console.log(error) })
    }
 
    return (
        <div className="h-full">
            <Head>
                <title>Profile</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AnimatePresence>
                {profileLoading && <Preloader />}
            </AnimatePresence>
            <div className="grid justify-items-start py-5 md:ml-5">
                <h1 className="text-2xl font-bold">Account Management</h1>
            </div>
            <AnimatePresence>
                {
                    showModal &&
                    <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        ease: "easeInOut"
                    }}
                    className='absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-75 flex justify-center items-center z-20'
                    layoutId={showModal}>
                        <ForgotPassword csrfToken={csrfToken} />
                    </motion.div>
                }
            </AnimatePresence>
            <div className='flex flex-col md:ml-5 '>
                <div className='h-1/4 md:h-full w-full flex flex-row items-center mb-3'>        
                    <form onSubmit={handleProfile}
                    className="w-full h-full flex flex-col md:flex-row" action="#" method="POST">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <div className='flex flex-row w-full md:w-2/5 mb-5 md:mb-0 justify-center items-center'>
                            {
                                editFullname ?
                                <>
                                    <div className='w-10/12'>
                                        <Input className='w-full text-sm'
                                        value={profileFullname}
                                        placeholder="Fullname"
                                        handleChange={(e) => setProfileFullname(e.target.value)}
                                        />
                                    </div>
                                    <div className='w-2/12 ml-2 flex flex-row items-center'>
                                        <div className='cursor-pointer mr-2' onClick={handleCancelEditFullname}><CancelIcon color='error' /></div>
                                        <button
                                        className='cursor-pointer'><SaveIcon color='success' /></button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='w-10/12 py-2 px-3 text-sm rounded-md bg-gray-300 capitalize'>{profileFullname}</div>
                                    <div className='w-2/12 ml-2 cursor-pointer' onClick={() => {
                                        setEditFullname(true)
                                        setEditEmail(false)
                                    }}><EditIcon color='success' /></div>
                                </>
                            }
                        </div>
                        <div className='flex flex-row w-full md:w-2/5 mb-5 md:mb-0 justify-center items-center'>
                            {
                                editEmail ?
                                <>
                                    <div className='w-10/12'>
                                        <Input
                                        className={`${signUpError ? 'border border-red-500' : ''} w-full text-sm`}
                                        value={email}
                                        placeholder="Email"
                                        handleChange={(e) => {
                                            setEmail(e.target.value)
                                            setSignUpError(false)
                                        }}
                                        />
                                        {
                                            signUpError ? <div className='text-red-500 font-semibold text-sm'>{ signUpErrorMsg }</div> : ''
                                        }
                                    </div>
                                    <div className='w-2/12 ml-2 flex flex-row items-center'>
                                        <div className='mr-2 cursor-pointer' onClick={handleCancelEditEmail}><CancelIcon color='error' /></div>
                                        <button className='cursor-pointer'><SaveIcon color='success' /></button>
                                    </div>
                                </>
                                :
                                <>
                                    <div className='w-10/12 py-2 px-3 text-sm rounded-md bg-gray-300'>{email}</div>
                                    <div className='w-2/12 ml-2 cursor-pointer' onClick={() => {
                                        setEditEmail(true)
                                        setEditFullname(false)
                                    }}><EditIcon color='success' /></div>
                                </>
                            }
                        </div>
                        <motion.div className='flex items-center w-full md:w-1/5'>
                            <motion.a onClick={() => setShowModal(true)} layoutId={showModal}
                            href="#" className="font-semibold rounded-sm w-full px-3 text-white text-center bg-violet-500 hover:bg-violet-600 active:bg-violet-600 
                            focus:outline-none focus:ring focus:ring-violet-300 py-2">
                                Reset Password
                            </motion.a>
                        </motion.div>
                    </form> 
                </div>
                {/* stripe or account management section */}
                <div className='h-3/4 md:h-full w-full flex flex-col items-center justify-center'>
                    {
                        showSubsBtn &&
                        <div onClick={handleProfileSubscription}
                        className='w-1/2 mx-auto'>
                            <ButtonField btnText="View Subscriptions Plan" className="w-full py-2" />
                        </div>
                    }
                    {
                        !showSubsBtn &&
                        <div className='w-full md:w-2/3 py-3 relative rounded-lg shadow-lg bg-white'>
                            <AnimatePresence>
                                {isLoadingSubsData && <Preloader />}
                            </AnimatePresence>
                            <div>
                                <table className='w-full text-xs md:text-sm'>
                                    <thead>
                                        <tr>
                                            <th className='md:w-1/3'>Current Plan</th>
                                            <th className='md:w-1/3'>Created</th>
                                            <th className='md:w-1/3'>
                                                {
                                                    status === "trialing" ? "Trial Period" : "Current Period"
                                                }
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='text-center'>
                                            <td className='text-xs'>
                                                {description} 
                                                <span className='ml-1 px-2 text-center whitespace-nowrap align-baseline font-medium bg-blue-600 text-white rounded animate-pulse'>
                                                    {active && "active"} - {status}
                                                </span>
                                            </td>
                                            <td>{created}</td>
                                            <td>{currentPeriodStart} to {currentPeriodEnd}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='w-full flex flex-col space-y-3 md:space-y-0 md:flex-row my-3'>
                                <div className='w-full md:w-1/3 flex items-center justify-center text-xs lg:text-sm'>
                                    {
                                        noUpcomingInvoice ? 
                                        "No upcoming invoice"
                                        : 
                                        <div>Next Invoice: £{amountDue/100} on {startPeriodUpInvoice}</div>
                                    }
                                    
                                </div>
                                <div onClick={() => {setShowModalInvoices(!showModalInvoices)}}
                                className='w-full md:w-1/3 flex items-center justify-center'>
                                    <ButtonField btnText={!showModalInvoices ? 'View Invoices' : 'Hide Invoices'} className="py-2" />
                                </div>
                                <div className='w-full md:w-1/3 flex items-center justify-center'>
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                        <Menu.Button 
                                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                                            Actions
                                            <ExpandMoreIcon
                                            className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                                            aria-hidden="true"
                                            />
                                        </Menu.Button>
                                        </div>
                                        <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                        >
                                        <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="px-1 py-1 ">
                                            {
                                                !cancelAtPeriodEnd ?
                                                <Menu.Item>
                                                    {({ active }) => (
                                                    <button onClick={cancelSubscription}
                                                        className={`${
                                                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    >
                                                        Cancel Subscription
                                                    </button>
                                                    )}
                                                </Menu.Item>
                                                :
                                                <Menu.Item>
                                                    {({ active }) => (
                                                    <button onClick={resumeSubscription}
                                                        className={`${
                                                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                    >
                                                        Resume Subscription
                                                    </button>
                                                    )}
                                                </Menu.Item>
                                            }
                                            
                                            </div>
                                        </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                            {
                                showModalInvoices ?
                                <div className='relative bg-white rounded-lg'>
                                    {/* <div onClick={() => setShowModalInvoices(false)} className='absolute top-0 right-0'>
                                        <CancelIcon className='cursor-pointer active:scale-95' fontSize='small' color='error' />
                                    </div> */}
                                    <div>
                                        <div className='flex flex-row justify-between border-gray-300 border-b h-9 pl-3'>
                                            <h1 className='flex items-center text-sm md:text-lg font-medium h-8'>Select a date below to view its invoice</h1>
                                        </div>
                                        <div>
                                            {
                                                invoices.map((invoice, index) => {
                                                    return <div 
                                                    key={index}
                                                    className="grid grid-cols-2 md:grid-cols-3 align-middle">
                                                        <a className='flex items-center justify-center'
                                                        href={invoice.hosted_invoice_url} target="_blank" rel='noreferrer'>
                                                            {formatDate.newDateFormat(invoice.created)[3]}
                                                        </a>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>:''
                            }
                        </div>
                    }                    
                </div>
            </div>
        </div>
    )
}

export default Profile
