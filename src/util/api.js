// @flow
import fetch from 'cross-fetch'

import HTTPErr from '../util/HTTPErr'
import settings from './apiSettings'
import type { ReplyData, ThreadData } from '../types'

let rootPath = '/api/'
if(settings.api) rootPath = settings.api

export const getThreads = (id?: string) => {
  let path = `${rootPath}thread`

  if(id) {
    path += `/${id}`
  }

  return fetch(path).then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
}

export const postReply = (id: string, data: ReplyData) => fetch(`${rootPath}thread/${id}/reply`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })

export const postThread = (data: ThreadData) => fetch(`${rootPath}thread`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
  .then(res => {
    if(!res.ok) throw new HTTPErr(res.statusText, res)
    return res.json()
  })
