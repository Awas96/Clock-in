<?php

namespace App\Controller;

use App\Repository\EventoRepository;
use App\Repository\IncidenciaRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class PrincipalController extends AbstractController
{
    /**
     * @Route("/", name="index")
     */
    public function index(EventoRepository $eventoRepository, IncidenciaRepository $incidenciaRepository, AuthenticationUtils $authenticationUtils): Response
    {
        $incidencias = $incidenciaRepository->findByEstado(1);
        dump($incidencias);
        return $this->render('principal/index.html.twig', [
            'incidencias' => $incidencias,
        ]);
    }
}
