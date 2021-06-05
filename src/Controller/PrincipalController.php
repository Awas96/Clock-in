<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class PrincipalController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(AuthenticationUtils $authenticationUtils): Response
    {

        return $this->render('principal/index.html.twig');
    }
}
