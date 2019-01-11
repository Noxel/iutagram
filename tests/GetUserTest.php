<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GetUserTest extends WebTestCase
{
    public function test_api_returns_user(){
        $client = $this->createClient();

        $client->request('GET', '/api/users/1', [], [],
            ['HTTP_ACCEPT' => 'application/ld+json']);
        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertSame('application/ld+json; charset=utf-8',
            $client->getResponse()->headers->get('Content-Type'));

        $content = json_decode($client->getResponse()->getContent(), true);



        $this->assertNotNull($content['username']);
        $this->assertNotNull($content['roles']);

        $this->assertNotNull($content['images']);
        $this->assertNotNull($content['images'][0]['path']);
        $this->assertNotNull($content['images'][0]['like']);
        $this->assertNotNull($content['images'][0]['comment']);


        $this->assertNotNull($content['post']);
        $this->assertNotNull($content['nbFollower']);
        $this->assertNotNull($content['nbUserFollowed']);

    }

    public function test_api_returns_user_list(){
        $client = $this->createClient();

        $client->request('GET', '/api/users', [], [],
            ['HTTP_ACCEPT' => 'application/ld+json']);
        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertSame('application/ld+json; charset=utf-8',
            $client->getResponse()->headers->get('Content-Type'));

        $content = json_decode($client->getResponse()->getContent(), true);


        $this->assertNotNull($content['hydra:member'][0]['username']);
    }
}
