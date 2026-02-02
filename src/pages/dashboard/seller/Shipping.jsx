import React from 'react'
import { sellerService } from '../../../services/sellerService'
import { useNotifications } from '../../../context/NotificationContext'
import Settings from './Settings'

export default function Shipping() {
  // Shipping settings are part of seller settings
  return <Settings />
}
