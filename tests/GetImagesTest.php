<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class GetImagesTest extends WebTestCase
{
    public function test_api_returns_image(){
        $client = $this->createClient();

        $client->request('GET', '/api/images/1', [], [],
                ['HTTP_ACCEPT' => 'application/ld+json']);
        $this->assertSame(200, $client->getResponse()->getStatusCode());
        $this->assertSame('application/ld+json; charset=utf-8',
                            $client->getResponse()->headers->get('Content-Type'));

        $content = json_decode($client->getResponse()->getContent(), true);


        $this->assertNotNull($content['path']);
        $this->assertNotNull($content['text']);

        $this->assertNotNull($content['owner']);
        $this->assertNotNull($content['owner']['username']);

        $this->assertNotNull($content['comments']);
        $this->assertNotNull($content['comments'][0]['text']);
        $this->assertNotNull($content['comments'][0]['owner']);
        $this->assertNotNull($content['comments'][0]['owner']['username']);


    }
}
